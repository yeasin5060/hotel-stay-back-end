//API to create a new room for a hotel

import { Hotel } from "../models/hotel.model.js";
import { cloudinaryFileUpload } from "../utis/cloudinary.js";
import { Room } from "../models/room.model.js";

const createRoom = async (req,res) => {
    try {
        const {roomType , pricePerNight , amenities} = req.body;
        const hotel = await Hotel.findOne({owner : req.auth.userId});
        if(!hotel){
            return res.json({success : false , message : "No Hotel found"});
        }

                //upload images to cloudinary
        const uploadImage = req.files.map(async (file) => {
            const response = await cloudinaryFileUpload(file.path , 'roomImage');
            return response.secure_url
        })
            // wait for all upload complete
        const images = await Promise.all(uploadImage);

        const roomCreate = await Room.create({
            hotel : hotel._id,
            roomType,
            pricePerNight : +pricePerNight,
            amenities : JSON.parse(amenities),
            images
        })
    
        res.json({success: true , message : 'Room Created Successfully' , roomCreate})

    } catch (error) {
        console.log('create room error' , error.message);
    }
}

//API to get all room
const getRoom = async (req,res) => {
    try {
        const rooms = await Room.find({isAvailable : true}).populate({
            path : 'hotel',
            populate : {
                path : 'owner',
                select : 'image'
            }
        }).sort({createdAt : -1})

        res.json({success : true , message : 'Get Room Successfully' , rooms})
    } catch (error) {
        console.log('get room error' , error.message);
        res.json({success : false , message : error.message})
    }
}

//API to get all rooms for a specific hotel
const getOwnerRoom = async (req,res) => {
    try {
        const hotelData = await Hotel.findOne({owner : req.auth.userId});
        const rooms = await Room.find({hotel : hotelData._id.toString()}).populate('hotel');
         res.json({success : true , message : 'Get Owner Room Successfully' , rooms})
    } catch (error) {
        console.log('get owner room error' , error.message);
        res.json({success : false , message : error.message})
    }
}

//API to toggle avaiability of a room
const toggleRoomAvailability = async (req,res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.sove()
         res.json({success : true , message : ' Room Availability Update' , roomData})
    } catch (error) {
        console.log('room availability error' , error.message);
         res.json({success : false , message : error.message})
    }
}


export {
    createRoom,
    getRoom,
    getOwnerRoom,
    toggleRoomAvailability
}
