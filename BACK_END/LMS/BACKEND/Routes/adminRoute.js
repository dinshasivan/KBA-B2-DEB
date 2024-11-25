import { Router } from "express";
import jwt from 'jsonwebtoken';
import multer from "multer";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import { authenticate } from "../MiddleWare/authentication.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs  from 'fs'

const adminRoute = Router();

const secretKey='hello'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    userRole: String 
    
});
const User = mongoose.model('UserDetails', userSchema);

const bookSchema = new mongoose.Schema({
    bookId:{type:String, unique:true},
    bookName:String,
    authorName:String,
    category:String,
    price:Number,
    description:String,
    image:String

});
const Book =mongoose.model('BookDetails',bookSchema);

mongoose.connect('mongodb://localhost:27017/LMS');



adminRoute.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const { FirstName, LastName, UserName, Password , UserRole} = data;

        const existingUser = await User.findOne({ userName: UserName });
        if (existingUser) {
            console.log("User name already exists!");
            return res.status(400).json({ message: "User exists" });
        }

        // Hash the password
        const newP = await bcrypt.hash(Password, 10);
        
        // Create a new user with default role as 'user'
        const newUser = new User({
            firstName: FirstName,
            lastName: LastName,
            userName: UserName,
            password: newP,
            userRole: UserRole 
        });

        // Save user to MongoDB
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

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
         }
     }
 })

//addbook
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


adminRoute.get('/',(req,res)=>{
    res.send("hello");
    
})
const uploadDir = join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Uploads directory created.");
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir); //  set upload directory
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});

const upload = multer({ storage: storage });

adminRoute.post('/addBook', authenticate, upload.single('image'), async (req,res)=>{
    try{
        const {BookId, BookName, AuthorName, Category, Price, Description}=req.body;
        const newBook = new Book({
            bookId:BookId,
            bookName:BookName,
            authorName:AuthorName,
            category:Category,
            price:Price,
            description:Description,
            image:req.file.path
        });

        const result = await newBook.save();
        res.status(201).json({message:"Book added successfully", result})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error addeding book",error});
        
    }
});

adminRoute.get('/getImage/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename);
    res.sendFile(filepath);
});

adminRoute.get('/viewBooks', async (req,res)=>{
    try{
        const books = await Book.find({});

        const bookswithImage = books.map(book =>{
            return {
                bookId:book.bookId,
                bookName:book.bookName,
                authorName:book.authorName,
                category:book.category,
                price:book.price,
                description:book.description,
                image:`${req.protocol}://${req.get('host')}/uploads/${book.image.split('/').pop()}`
            };
        });

        res.status(200).json({meessage:"Book retrieved successfull", books:bookswithImage});
    }
    catch(error){
        console.log("error retrieving book",error);
        res.status(500).json({message:"error retriveing books",error})
        
    }
});

adminRoute.delete('/deleteBook/:bookId', async (req, res)=>{
    try{
        const bookId = req.params.bookId;
        const deleteBook = await Book.findOneAndDelete(bookId);

        if(deleteBook){
            res.status(200).json({message:"Book deleted successfull",deleteBook});
            console.log("Book deleted Successfull");
            
        }
        else{
            res.status(400).json({message:"Book not found"})
        }
    }
    catch(error){
        console.error(error);
        
    }
})

adminRoute.put('/updateBook/:bookId', async(req, res)=>{
    try{
        const bookid = req.params.bookId;
        const {BookId, BookName, AuthorName, Category, Price}=req.body;

        const updateBook = await Book.findOneAndUpdate(bookid);

        if(updateBook){
            res.status(200).json({message:"Book Details updated successfull",updateBook});
            console.log("Book Details updated successful",updateBook);
            
        }else{
            res.status(400).json({message:"book not found"})
        }
    }
    catch(error){
        console.error(error);
        
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
export {adminRoute}