import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { authenticate } from "../mdware/auth.js";


const userRoute = Router();

const user=new Map();
const certificates =new Map();
const secretKey='hello'
userRoute.post('/issuuecertificate',authenticate,(req,res)=>{
    const userRole=req.userRole;
    try{
        if(userRole=='Admin'){
            const {
                CertificateId,
                Course,
                CertificateName,
                Grade,
                IssueDate
            }=req.body;
    
            if(certificates.has(CertificateId)){
                console.log("Already Issued")
                res.status(200).json({message:"Already issued!"});
            }
            else{
                certificates.set(CertificateId,{Course,CertificateName,Grade,IssueDate});
                console.log(certificates);
                res.status(201).json({message:"New Certificate!"})
            }
        }
        else{
            console.log("your not an admin ");
            
        }
    }
    catch(error){
        res.status(500).json(error);
    }
})
userRoute.post('/signup', async (req, res) => {
    try {
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

userRoute.post('/login', async (req,res)=>{
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
            res.cookie('AuthToken',token,{
                httpOnly:true
            });
            console.log(token);
            res.status(200).json({token})
        }
    }

})
export{userRoute};