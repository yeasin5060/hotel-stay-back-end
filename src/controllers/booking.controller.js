import { Booking } from "../models/booking.model.js";
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
export {
    checkAvailabilityAPI,
    createBooking
}