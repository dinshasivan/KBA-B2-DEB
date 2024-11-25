import {Router} from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { authenticate } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';



const route = Router();
const secretKey='hello'

const BookinSchema = new mongoose.Schema({
    roomNo:String,
    checkinDate:String,
    checkinDay:String,
    checkoutDate:String,
    personName:String,
});

const Booking = mongoose.model('BookingDetails',BookinSchema);

const UserSchema = new mongoose.Schema({
    fullName:String,
    userName:{type:String, unique:true},
    password:String,
    userRole:String
    
});
const User = mongoose.model('UserDetails',UserSchema);

mongoose.connect('mongodb://localhost:27017/HotelBooking');


route.post('/signup',async (req,res)=>{
    try{
        const {fullName, userName, password, userRole}=req.body;

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            userName,
            password:hashedPass,
            userRole
        });
        await newUser.save();

        res.status(201).json(newUser)

    }catch(err){
        console.error(err);
        
    }
})

route.post('/login', async (req,res)=>{
    // const data=req.body;
     const {
         userName,
         password
     }=req.body
 
     const result = await User.findOne({userName:userName})
     console.log(result);
     if(!result){
         res.status(403).json({message:"user not exist"})
     }
     else{
         console.log(password);
        
 
         const invalid = await bcrypt.compare(password, result.password);
         console.log(invalid);
         if(!invalid){
             res.status(403).json({message:"Password is incorect"})
         }
         else{
             const token= jwt.sign({UserName:userName,UserRole:result.userRole},secretKey,{expiresIn:"1h"})
             res.cookie('authToken',token,{
                 httpOnly:true
             });
             console.log(token);
             res.status(200).json({result});
             console.log("Login successfull");
             
             //  res.status(200).json({message:"login successfully"});
         }
     }
 })

route.post('/hotelBooking', async (req, res) => {
    try {
        const { roomNumber, checkInDate, checkOutDate, bookingPerson } = req.body;

        // Check if a booking already exists for the same room and date range
        const existBooking = await Booking.findOne({
            roomNo: roomNumber
        });

        if (existBooking) {
            res.status(400).json({ message: "Room already booked for the selected dates" });
            console.log("Room already booked for the selected dates");
        } else {
            // Create a new booking
            const newBooking = new Booking({
                roomNo: roomNumber,
                checkinDate:checkInDate,
                checkoutDate:checkOutDate,
                personName: bookingPerson,
            });

            await newBooking.save();
            res.status(201).json({ message: "Booking is successful" });
            console.log("Booking is successful");
        }
    } catch (err) {
        console.error('Error occurred while processing booking:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get all booking
route.get('/getBooking', async (req, res)=>{
    try{
        const BookingDetails = await Booking.find()
        console.log();


        console.log(BookingDetails);
        res.status(200).json(BookingDetails)
    }
    catch(error){
        console.error(error);
        
    }
})

// route.get('/getBooking/:checkinDay',async (req,res)=>{
//     try{
//         const CheckinDay = req.params.checkinDay;
//         const BookingDetails = await Booking.find({ checkinDay: CheckinDay });
//         res.json(BookingDetails);
//         console.log(BookingDetails);
        
//     }
//     catch(error){
//         console.log(error);
        
//     }
// })

//get booking by specific date
route.get('/getBooking/:date',  async (req, res) => {
    try {
        const { date } = req.params; // Get the date from the query parameters
        if (date) {
            const bookings = await Booking.find({
                $or: [
                    { checkinDate: date },
                    { checkoutDate: date }
                ]
            });
            res.status(200).json(bookings);
        } else {
            
            const bookings = await Booking.find({});
            res.status(200).json(bookings);
        }
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Failed to retrieve bookings' });
    }
});


//delete booking
route.delete('/deleteBooking/:bookingId', async(req, res)=>{
    
    const {bookingId} = req.params.bookingId;
    
    const deletebooking = await Booking.findOneAndDelete(bookingId);
    if (deletebooking) {
        res.status(200).json({ message: 'Booking deleted successfully',deletebooking });
    } else {
        res.status(404).json({ message: 'Booking not found' });
    }
})

//edit booking
route.put('/editBooking/:bookingId',async (req, res)=>{
    try{
        const bookingId = req.params.bookingId;

        const {BookingId ,RoomNo, Checkin_Date, CheckinDay, Checkout_Date, PersonName}=req.body;
        const data = await Booking.findOneAndUpdate({bookingId:bookingId},{
            $set:{
                bookingId:BookingId,
                roomNo:RoomNo,
                checkinDate:Checkin_Date,
                checkinDay:CheckinDay,
                checkoutDate:Checkout_Date,
                personName:PersonName
            }
        });
        await data.save();
        if(data.matchedCount == 0){
            return res.status(404).json({message:"booking not found"})
        }else{
           res.status(201).json({ message: "Booking Details Updated" ,data}) 
        }

    }
    catch(error){
        console.error(error);
        
    }
})

route.get('/viewUser',authenticate,(req,res)=>{
    try{
    const user=req.UserRole;
    console.log(user);
    res.json({user});
    }
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

export {route}