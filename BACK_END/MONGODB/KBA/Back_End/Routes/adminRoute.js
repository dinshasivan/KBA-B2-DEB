import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { authenticate } from "../MiddleWare/auth.js ";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const adminRoute = Router(); //create instance 

const secretKey = process.env.SecretKey;

//Define user schema 
const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    userRole: String
})

//create model /create a collection using Schema and model 
const User = mongoose.model('UserDetails', userSchema); // name the collection

const CourseSchema = new mongoose.Schema({

    courseId:{type:String, unique: true},
    courseName:String,
    courseType:String,
    description:String,
    coursePrice:Number
})

const Courses = mongoose.model('coursedetails',CourseSchema);

mongoose.connect('mongodb://localhost:27017/KBA_Course_DB')


adminRoute.get('/', (req, res) => {
    res.send("Hello world")
})

adminRoute.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const { FirstName,
            LastName,
            UserName,
            Password,
            Role } = data;
        const newP = await bcrypt.hash(Password, 10);
        const existingUser = await User.findOne({ userName: UserName })
        if (existingUser) {
            console.log("User name already exist!")
            res.status(400).json({ message: "User exist" })
        }
        else {
            //create a new user
            const newUser = new User({
                firstName: FirstName,
                lastName: LastName,
                userName: UserName,
                password: newP,
                userRole: Role
            });
            //save user to Mongodb
            await newUser.save();
            res.status(201).json({ message: "User registered successfully" })
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})


//login
adminRoute.post('/login', async (req,res)=>{
   // const data=req.body;
    const {
        UserName,
        Password
    }=req.body

    const result = await User.findOne({userName:UserName})
    console.log(result);
    if(!result){
        res.status(403).json({message:"user not exist"})
    }
    else{
        console.log(Password);
       

        const invalid = await bcrypt.compare(Password, result.password);
        console.log(invalid);
        if(!invalid){
            res.status(403).json({message:"Password is incorect"})
        }
        else{
            const token= jwt.sign({UserName:UserName,UserRole:result.userRole},secretKey,{expiresIn:"1h"})
            res.cookie('authToken',token,{
                httpOnly:true
            });
            console.log(token);
            res.status(200).json({token});
            console.log("Login successfull");
            
            //  res.status(200).json({message:"login successfully"});
        }
    }
})

//addcourse

adminRoute.post('/addcourse', authenticate, async (req, res) => {
    const role = req.UserRole;

    try {
        if (role === 'Admin') {
            const body=req.body;
            const {
                CourseId,
                CourseName,
                CourseType,
                Description,
                Price
            } = body;

            // Check if the course already exists 
            const existingCourse = await Courses.findOne({courseId:CourseId})
            if (existingCourse) {
                res.status(400).json({ message: "Course already exists." });
                console.log("Course already exist");
                
            }
            else{
                // Add the new course
                const newCourse = new Courses({
                    courseId:CourseId,
                    courseName:CourseName,
                    courseType:CourseType,
                    description:Description,
                    coursePrice:Price
                });
                await newCourse.save();
                console.log("Successfully added!", newCourse);
                res.status(201).json({ message: "Successfully added course!" });
            }
        
        } else {
            // User is not authorized
            console.log("Access denied: User is not an admin");
            res.status(403).json({ message: "Access denied: Admins only" });
        }
    } catch (err) {
        console.error("Error adding course:", err);
        // Return a server error response
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});


// adminRoute.get('/getCourse/:Id',authenticate,(req,res)=>{
//     const search=req.params.Id;
//     try{
//         if(req.UserName){
//             if(search){
//                 const searchResult=[];
//                 if(Courses.length>0){
//                     for(const[id,item] of Courses){

//                         if(id.includes(search) || item.CourseName.includes(search)||item.CourseType.includes(search)){
//                             searchResult.push(id,item.CourseName,item.CourseType,item.Price,item.Description);
//                             console.log('Course Details',searchResult);
//                             res.status(200).json({message:"seach item found"})
//                             break;
//                         }
//                         else{
//                             console.log("Course details not available");
//                             res.status(404).json({message:"Course not availbale"})
//                         }
//                     }
//                 }
//                 else{
//                     console.log("Data base is empty");

//                 }
//             }
//         }
//         else{
//             console.log("please login!");
//         }
//     }
//     catch(err){
//         console.log("error handled");
//     }



// })  //get values using params

 //using query
 
 
adminRoute.get('/getCourse',async(req,res)=>{
    try{
   const search= req.query.CourseId; 
   console.log(search);
        const result =await Courses.findOne({courseId:search});
        console.log(result);
        
        if (result) {
            // res.send(result);
            res.status(200).json({result})
            
        }
        else {
            res.status(404).json({ message: "No course found" })
           
        }
    }
    catch (error) {
        res.status(400).json({ message: "Check the input" })
    }
 })

 adminRoute.patch('/updateCourse/:id',authenticate, async (req,res)=>{
    const user = req.UserRole;

    const body=req.body;
    console.log(body);
    
    const {  CourseName, CourseId, CourseType, Description, Price } = body;

    try {

        if (user === "Admin") {
            try {
                const update=req.params.id;
                let data =await Courses.updateOne({courseId:update},{
                    $set:{
                        courseId:CourseId,
                        courseName:CourseName,
                        courseType:CourseType,
                        description:Description,
                        coursePrice:Price
                    }
                });
                if(data.matchedCount == 0){
                    return res.status(404).json({message:"No such course"})
                }else{
                   res.status(201).json({ message: "Course Details Updated" }) 
                }
            }
            catch (error) {
                res.status(400).json({ message: "Check the Course Details" });
            }
        }

        else {
            res.status(400).json({ message: "Unauthorized Access" })
        }
    }
    catch (error) {
        res.status(401).json({ message: "Check Course details" });

    }

})

adminRoute.delete('/deleteCourse/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const deletedCourse = await Courses.findOneAndDelete({ courseId: courseId });
        
        if (deletedCourse) {
            res.status(200).json({ message: 'Course deleted successfully', deletedCourse });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting course', error: err.message });
    }
});


adminRoute.get('/viewCourse', async(req,res)=>{
    const viewAll=await Courses.find();
    try{
        if(Courses.length>0){
            res.status(200).json({viewAll})
        }
         else{
            res.status(404).json({message:'Not Found'});
        }
    }

    catch(err){
        console.log(err);

    }
})
adminRoute.get('/viewUser',authenticate,(req,res)=>{
    try{
    const user=req.UserRole;
    // console.log(user);
    res.json({user});
    }
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

// adminRoute.get('/logout',(req,res)=>{
//     res.clearCookie('authToken');
//     res.status(200).json({message: "User Successfully logout"});
// })
export { adminRoute };


