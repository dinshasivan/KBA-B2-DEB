
import express from 'express'
import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { authenticate } from "../MiddleWare/authenticate.js";
import mongoose from "mongoose";
// import multer from "multer";
import path from "path";
import formidable from 'formidable'
import Books from "../models/model.js";
import { fileURLToPath } from 'url';  // To resolve the filename
import { dirname } from 'path';  


const adminRoute = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// adminRoute.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//schema for storing user details
const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    userRole: String
})

const User = mongoose.model('UserDetails', userSchema); // name the collection


mongoose.connect('mongodb://localhost:27017/LMS_DB')

// const user=new Map();

const secretKey='hello'
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
        //  console.log(Password);
        
         const invalid = await bcrypt.compare(Password, result.password);
        //  console.log(invalid);
         if(!invalid){
             res.status(400).json({message:"Password is incorect"})
         }
         else{
             const token= jwt.sign({UserName:UserName,UserRole:result.userRole},secretKey,{expiresIn:"1h"})
             res.cookie('authToken',token,{
                 httpOnly:true
             });
             console.log(token);
             res.status(200).json({message:"User login Successfully",token});
             console.log("Login successfull");
             
             //  res.status(200).json({message:"login successfully"});
         }
     }
 })

 
 // Define the upload directory
 const uploadDir = path.join(__dirname, '../uploads');
 
 // Route for adding books
 adminRoute.post('/addBooks', authenticate, (req, res) => {
    // Ensure only 'Admin' users can add books
    const user = req.UserRole; // Assuming you have set user role in the request
    if (user !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Use Formidable to handle file upload and form parsing
    const form = formidable({
        uploadDir: uploadDir, // Set the directory for file uploads
        keepExtensions: true, // Keep the file extension of the uploaded file
        allowEmptyFiles: false, // Disallow empty files
        multiples: false, // Only one file at a time
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error parsing the form data', error: err });
        }

        try {
            // Extract book details from the form, ensuring no array values are passed
            const { BookId, BookName, AutherName, Category, Description, Price } = fields;

            // Convert the values to the correct types (strings or numbers)
            const bookId = BookId ? BookId[0] : null;  // Ensure it is a string, not an array
            const bookName = BookName ? BookName[0] : '';
            const autherName = AutherName ? AutherName[0] : '';
            const category = Category ? Category[0] : '';
            const description = Description ? Description[0] : '';
            const price = Price ? Number(Price[0]) : null;  // Ensure it is a number, not an array

            // Validate fields
            if (!bookId || !bookName || !autherName || !category || !description || price === null) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Check if the image is provided
            if (!files.image) {
                return res.status(400).json({ message: 'Image file is required' });
            }

            // Check if the book already exists
            const existingBook = await Books.findOne({ bookId: bookId });
            if (existingBook) {
                return res.status(400).json({ message: "Book already exists" });
            }

            // Construct the image path (relative to the public folder)
            const imagePath = '/uploads/' + path.basename(files.image[0].filepath);

            console.log(imagePath);
            
            // Create a new book document
            const newBook = new Books({
                bookId: bookId,
                bookName: bookName,
                autherName: autherName,
                category: category,
                description: description,
                price: price,
                image: imagePath, // Store the image path in the database
            });

            // Save the book to the database
            const result = await newBook.save();

            res.status(201).json({
                message: "Book added successfully",
                bookId: result._id,
            });

        } catch (error) {
            console.error("Error adding book:", error);
            res.status(500).json({ message: "Error adding book", error });
        }
    });
});

adminRoute.get('/books', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch books', error: err.message });
    }
});

 
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
export{adminRoute};