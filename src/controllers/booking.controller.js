import { Booking } from "../models/booking.model.js";
import { Hotel } from "../models/hotel.model.js";
import { Room } from "../models/room.model.js";

// function to check availability of room

const checkAvailability = async ({checkInDate , checkOutDate , room}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate : {$lte : checkInDate},
            checkInDate : {$gte : checkInDate}
        });
        const isAvaiable = bookings.length === 0 ;
        return isAvaiable;
    } catch (error) {
        console.log('check availability error' , error.message);
    }
}

// API to check availability of room
// POST/api/bookings/check-availability

const checkAvailabilityAPI = async (req , res) => {
    try {
        const { room , checkInDate , checkOutDate} = req.body;
        const isAvaiable = await checkAvailability ({checkInDate , checkOutDate , room});
        res.json({success : true , message : 'check availality api successfullly' , isAvaiable});
    } catch (error) {
        console.log('check availability api error' , error.message);
         res.json({success : false , message : error.message})
    }
}

// API to create a new booking
//POST /api / booking / book

const createBooking = async (req , res) => {
    try {
        const {room , checkInDate , checkOutDate , guests} = req.body;
        const user = req.user._id;

            // Befor Booking Check The Availability
        const isAvaiable = await checkAvailability({room , checkInDate , checkOutDate});

        if(!isAvaiable){
            return res.json({success : false , message : 'Room is not Available'})
        }

            // get totalprice from room
        const roomData = await Room.findById(room).populate('hotel');

        let totalPrice = roomData.pricePerNight;
            
            //Calculate totalprice based on night
        const checkIn =  new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights ;

        const booking = await Booking.create({
            user,
            room,
            hotel : roomData.hotel._id,
            guests : +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        res.json({success : true , message : 'Booking create Successfully' , booking});

    } catch (error) {
        console.log('create booking error' , error.message);
        res.json({success : false, message :'Failed to create booking'});
    }
}


// API to get all booking for a user
// Get / api/bokking/ user

const getUserBokkings = async (req , res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate('room hotel').sort({createdAt : -1});
        res.json({success : true , message : 'get user booking successfully' , bookings});
    } catch (error) {
        console.log('get user booking error' , error.message);
        res.json({success :false, message : 'get user booking error'});
    }
}

const getHotelBooking = async (req , res) => {
    try {
        const hotel = await Hotel.findOne({owner : req.auth.userId});
        if(!hotel){
            return res.json({success : false , message : 'No Hotel Found'});
        }
        const booking = await Booking.find({hotel : hotel._id}).populate('room hotel user').sort({createdAt : -1});
            // total booking
        const totalBooking = booking.length;
            // total revenue
        const totalRevenue = booking.reduce(( acc , booking)=> acc + booking.totalPrice , 0);

        res.json({success : true , message : 'get hotel booking Successfully', dashboardData : { totalBooking , totalRevenue , booking} });
    } catch (error) {
        console.log('get hotel booking error' , error.message);
         res.json({success : false , message : 'get hotel booking error'});
    }
}
export {
    checkAvailabilityAPI,
    createBooking, 
    getUserBokkings,
    getHotelBooking
}