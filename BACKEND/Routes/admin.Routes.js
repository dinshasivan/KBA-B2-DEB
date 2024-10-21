import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { authenticate } from "../Middleware/autherization.js";

const adminRoute = Router(); //create instance 

adminRoute.get('/', (req, res) => {
    res.send("Hello world")
})
const user=new Map();
const secretKey="hello";
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
            res.status(200).json({token})
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
adminRoute.post('/addcourse',authenticate,(req,res)=>{
    // console.log(req.UserName);
    // console.log(req.UserRole);
    const role=req.UserRole;
    try{
        if(role=='Admin'){
            // console.log('You can add course!');
            const {
                CourseId,
                CourseName,
                CourseType,
                Description,
                Price
            }=req.body;
            course.set(CourseId,{CourseName,CourseType,Description,Price});
            res.status(200).json({message:"Successfully add course!"});
           
            console.log("Successfully added!");
            console.log(course);
            
        }
        else{
            console.log("You are not an admin");
        }
    
    }
    catch(err) {
        console.log(err);
    }
    



})

export {adminRoute};


