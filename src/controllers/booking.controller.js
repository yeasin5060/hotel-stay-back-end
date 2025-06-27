import { Booking } from "../models/booking.model.js";

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

export {
    checkAvailabilityAPI
}