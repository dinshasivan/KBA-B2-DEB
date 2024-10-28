import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { authenticate } from "../MiddleWare/auth.js ";
import dotenv from 'dotenv';

dotenv.config();
const adminRoute = Router(); //create instance 

adminRoute.get('/', (req, res) => {
    res.send("Hello world")
})
const user=new Map();
const secretKey=process.env.SecretKey;
//signup
adminRoute.post('/signup', async (req, res) => {
    try {
        // const data = req.body;
        // const fname=Firstname;
        const { FirstName,
            LastName,
            UserName,
            Password,
            Role } = req.body;
        const newP = await bcrypt.hash(Password, 10);
       
        if (user.has(UserName)) {
            console.log("User already registered!")
            res.status(403).json({ message: "User already registered!" });
        }
        else {
            user.set(UserName, { FirstName, LastName, Password: newP, Role });
            console.log("User successfully registered!")
            res.status(201).json({ message: "User Successfully registered!" });
            console.log(user.get(UserName));
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})

//login
adminRoute.post('/login', async (req,res)=>{
    const data=req.body;
    const {
        UserName,
        Password
    }=data;

    const result=user.get(UserName);
    console.log(result);
    if(!result){
        res.status(403).json({message:"user not exist"})
    }
    else{
        console.log(Password);
       

        const invalid = await bcrypt.compare(Password, result.Password);
        console.log(invalid);
        if(!invalid){
            res.status(403).json({message:"Password is incorect"})
        }
        else{
            const token= jwt.sign({UserName:UserName,UserRole:result.Role},secretKey,{expiresIn:"1h"})
            res.cookie('authToken',token,{
                httpOnly:true
            });
            console.log(token);
            // res.status(200).json({token});
            res.status(200).json({message:"login successfully"});
        }
    }

    // if(user.has(UserName)){
    //     console.log(user.get(UserName));
    //     res.status(403).json({ message: "User already registered!" });
    // }
    // else{
    //     console.log("User doesn't exist!");

    // }
})

//addcourse
const course =new Map();
adminRoute.post('/addcourse', authenticate, (req, res) => {
    const role = req.UserRole;

    try {
        if (role === 'admin') {
            const body=req.body;
            const {
                CourseId,
                CourseName,
                CourseType,
                Description,
                Price
            } = body;

            // Check if the course already exists to avoid duplication
            if (course.has(CourseId)) {
                res.status(409).json({ message: "Course already exists." });
            }

            // Add the new course
            course.set(CourseId, { CourseName, CourseType, Description, Price });
            console.log("Successfully added!", course);

            // Respond with a success message
            res.status(201).json({ message: "Successfully added course!" });
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

// adminRoute.post('/getCourse',authenticate,(req,res)=>{
   
//     try{
//         if(req.UserName){
//             const data=req.body;
//             const search=data.Search;
//             if(search){
//                 const searchResult=[];
//                 for(const[id,item] of course){
//                     if(id.includes(search) || item.CourseName.includes(search)||item.CourseType.includes(search)){
//                         searchResult.push(id,item.CourseName,item.CourseType,item.Price,item.Description);
//                         console.log('Course Details',searchResult);
//                         res.status(200).json({message:"seach item found"})
//                         break;
//                     }
//                     else{
//                         console.log("Course not available");
//                         res.status(404).json({message:"Course not availbale"})
//                     }
//                 }
//             }
//             else{
//                 console.log("please login!");
                
//             }
           
//         }
//     }
//     catch(err){
//         console.log(err)
//     }

//     // console.log(course);
// })

adminRoute.get('/getCourse/:Id',authenticate,(req,res)=>{
    const search=req.params.Id;
    try{
        if(req.UserName){
            if(search){
                const searchResult=[];
                if(course.size>0){
                    for(const[id,item] of course){
                    
                        if(id.includes(search) || item.CourseName.includes(search)||item.CourseType.includes(search)){
                            searchResult.push(id,item.CourseName,item.CourseType,item.Price,item.Description);
                            console.log('Course Details',searchResult);
                            res.status(200).json({message:"seach item found"})
                            break;
                        }
                        else{
                            console.log("Course details not available");
                            res.status(404).json({message:"Course not availbale"})
                        }
                    }
                }
                else{
                    console.log("Data base is empty");
                    
                }
            }
        }
        else{
            console.log("please login!");
        }
    }
    catch(err){
        console.log("error handled");
    }
    

     
})  //get values using params

adminRoute.get('/getCourse',(req,res)=>{
    console.log(req.query.courseId);
     
})

adminRoute.put('/updateCourse/:id',authenticate,(req,res)=>{
    // console.log(req.UserName);
    // console.log(req.UserRole);
    const role=req.UserRole;
    console.log(role);
    
    try{
        if(role=='admin'){
            const data=req.body;
            const update=req.params.id;
            console.log(update);
            if(course.has(update)){
                const item=course.get(update);
                // console.log(item);
                // const value=req.body
                const {
                    newName,
                    newDescription,
                    newType,
                    newPrice
                }=data;
                item.CourseName= newName 
                item.CourseType= newType 
                item.Description = newDescription 
                item.Price = newPrice 
                course.set(update,item);
                console.log("successfully update",course);
                res.status(200).json({message:"successfully updated"})
                
            }
            else{
                console.log("Not found")
                res.status(404).json({message:"Not found"})
            }
            
        }
        else{
            console.log("You are not an admin");
        }
    
    }
    catch(err) {
        console.log(err);
    }
})

adminRoute.post('/updateCourse',authenticate,(req,res)=>{
    // console.log(req.UserName);
    // console.log(req.UserRole);
    const role=req.UserRole;
    try{
        if(role=='aadmin'){
            const data=req.body;
            const update=data.newId;
            // console.log(update);
            if(course.has(update)){
                const item=course.get(update);
                // console.log(item);
                // const value=req.body
                const {
                    newId,
                    newName,
                    newDescription,
                    newType,
                    newPrice
                }=data;
                item.CourseId= newId || item.CourseId
                item.CourseName= newName || item.CourseName
                item.CourseType= newType || item.CourseType
                item.Description = newDescription || item.Description
                item.Price = newPrice || item.Price
                course.set(newId,item);
                console.log("successfully update",course);
                res.status(200).json({message:"successfully updated"})
                
            }
            else{
                console.log("Not found")
                res.status(404).json({message:"Not found"})
            }
            // const {
            //     CourseId,
            //     CourseName,
            //     CourseType,
            //     Description,
            //     Price
            // }=req.body;
            // course.set(CourseId,{CourseName,CourseType,Description,Price});
            // res.status(200).json({message:"Successfully update the course!"});
           
            // console.log("Successfully updated!");
            // console.log(course);
            
        }
        else{
            console.log("You are not an admin");
        }
    
    }
    catch(err) {
        console.log(err);
    }
})

adminRoute.patch('/updateCourse/:id',authenticate,(req,res)=>{
    // console.log(req.UserName);
    // console.log(req.UserRole);
    const role=req.UserRole;
    try{
        if(role=='admin'){
            const data=req.body;
            const update=req.params.id;
            // console.log(update);
            if(course.has(update)){
                const item=course.get(update);
                // console.log(item);
                // const value=req.body
                const {
                    
                    newName,
                    newDescription,
                    newType,
                    newPrice
                }=data;
                
                item.CourseName= newName || item.CourseName
                item.CourseType= newType || item.CourseType
                item.Description = newDescription || item.Description
                item.Price = newPrice || item.Price
                course.set(update,item);
                console.log("successfully update",course);
                res.status(200).json({message:"successfully updated"})
                
            }
            else{
                console.log("Not found")
                res.status(404).json({message:"Not found"})
            }
        }
        else{
            console.log("You are not an admin");
        }
    
    }
    catch(err) {
        console.log(err);
    }
})


adminRoute.delete('/deleteCourse/:id',authenticate,(req,res)=>{
    const role=req.UserRole;
    try{
        if(role=='Admin'){
            const data=req.params.id;
            if(course.has(data)){
                course.delete(data);
                console.log("Course deleted");
                res.status(200).json({message:"course deleted"})
            }
            else{
                console.log("Course not found!");
                res.status(404).json({message:"course not found"})
                
            }
        }
        else{
            console.log("Please login!");
            
        }
    }
    catch(err){

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

adminRoute.get('/viewCourse',(req,res)=>{
    try{
        if(course.size!=0){
           
            
            res.send(Array.from(course.entries()))
        }
    else{
        res.status(404).json({message:'Not Found'});
    }
    }
    
    catch(err){
        console.log(err);
        
    }
})
export {adminRoute};


