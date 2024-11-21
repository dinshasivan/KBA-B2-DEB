import {Router} from 'express';
import mongoose from 'mongoose';




const route = Router();

const BookinSchema = new mongoose.Schema({
    bookingId:{type:String, unique:true},
    roomNo:String,
    checkinDate:String,
    checkinDay:String,
    checkoutDate:String,
    personName:String,
});

const Booking = mongoose.model('BookingDetails',BookinSchema);

mongoose.connect('mongodb://localhost:27017/HotelBooking')

route.post('/hotelBooking',async (req,res)=>{
    try{
        const {BookingId ,RoomNo, Checkin_Date, CheckinDay, Checkout_Date, PersonName}=req.body;
        
        const existBooking = await Booking.findOne({bookingId:BookingId});

        console.log(existBooking);

        if(existBooking){
            res.status(400).json({message:"Booking id already in db"});
            console.log("booking id is exsting");
            
        }else{

            const newBooking = new Booking({
                bookingId:BookingId,
                roomNo:RoomNo,
                checkinDate:Checkin_Date,
                checkinDay:CheckinDay,
                checkoutDate:Checkout_Date,
                personName:PersonName
            });
            await newBooking.save();
            res.status(201).json({message:"Booking is successfull"})
            console.log("Booking is successfull");
            
        }
    }
    catch(err){
        console.error('check the details',err);
        
    }
})

//get all booking
route.get('/getBooking', async (req, res)=>{
    try{
        const BookingDetails = await Booking.find()
        console.log();


        console.log(BookingDetails);
        res.status(200).json({message:"Booking Details",BookingDetails})
    }
    catch(error){
        console.error(error);
        
    }
})

route.get('/getBooking/:checkinDay',async (req,res)=>{
    try{
        const CheckinDay = req.params.checkinDay;
        const BookingDetails = await Booking.find({ checkinDay: CheckinDay });
        res.json({message:"Booking details in a perticular day:",BookingDetails});
        console.log(BookingDetails);
        
    }
    catch(error){
        console.log(error);
        
    }
})

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

export {route}