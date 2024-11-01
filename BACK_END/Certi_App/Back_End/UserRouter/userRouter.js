import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { authenticate } from "../mdWare/auth.js";
import mongoose from "mongoose";


const userRoute = Router();

// const user=new Map();
// const certificates =new Map();
const secretKey='hello';

const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    userRole: String
})
const User = mongoose.model('UserDetails', userSchema);

const CertificatesSchema = new mongoose.Schema({
    certiId:{type: String, unique:true},
    courseName:String,
    candidateName:String,
    grade:String,
    issueDate:String
})
const Certificates = mongoose.model('certificate_details',CertificatesSchema);

mongoose.connect('mongodb://localhost:27017/CertiApp_DB')


userRoute.post('/issuecertificate', authenticate, async (req, res) => {
    const role = req.UserRole;
    console.log(role);
    

    try {
        if (role === 'Admin') {
            const body=req.body;
            const {
                CertificateId,
                Course,
                CName,
                Grade,
                IssueDate
            } = body;

            // Check if the course already exists 
            const existingCerti = await Certificates.findOne({certiId:CertificateId})
            if (existingCerti) {
                res.status(400).json({ message: "Certificate already present." });
                console.log("Certificate already exist");
                
            }
            else{
                // Add the new course
                const newCerti = new Certificates({
                    certiId:CertificateId,
                    courseName:Course,
                    candidateName:CName,
                    grade:Grade,
                    issueDate:IssueDate
                });
                await newCerti.save();
                console.log("Successfully issued!", newCerti);
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
userRoute.post('/signup', async (req, res) => {
    try {
        const { FirstName,
            LastName,
            UserName,
            Password,
            Role } = req.body;
        const newP = await bcrypt.hash(Password, 10);
       
        const existingUser= await User.findOne({userName:UserName})
        if (existingUser) {
            console.log("User already exsit!")
            res.status(403).json({ message: "User already exist!" });
        }
        else {
            const newUser = new User({
                firstName:FirstName,
                lastName:LastName,
                userName:UserName,
                password: newP,
                userRole:Role
            });
            await newUser.save();
            console.log("User successfully registered!")
            res.status(201).json({ message: "User Successfully registered!" });
            console.log(newUser);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})

userRoute.post('/login', async (req,res)=>{
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
             res.cookie('AuthToken',token,{
                 httpOnly:true
             });
             console.log(token);
             res.status(200).json({token});
             console.log("Login successfull");
             
             //  res.status(200).json({message:"login successfully"});
         }
     }
 })

userRoute.get('/viewCertificate', async(req,res)=>{
    try{
        if(Certificates.length == 0){

            res.status(404).json({message:'Not Found'});
            
        }
        else{
            const data  = await Certificates.find();
            console.log(data);
            res.send(data)
            res.status(201).json({data});
        }
    }
    catch(err){
        console.log(err);
    }
})


userRoute.get('/search/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const certificateData = await Certificates.findOne({ certiId: id });

        if (certificateData) {
            res.status(200).json({ message: "Certificate find", data: certificateData });
        } else {
            res.status(404).json({ message: "thsi id not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
})

userRoute.get('/viewUser',authenticate,(req,res)=>{
    try{
    const user=req.UserRole;
    // console.log(user);
    res.json({user});
    }
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

userRoute.get('/logout',(req,res)=>{
    res.clearCookie('AuthToken');
    res.status(200).json({message: "User Successfully logout"});
})
   
export{userRoute};