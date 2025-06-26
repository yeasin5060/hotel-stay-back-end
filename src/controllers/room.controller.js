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

}

//API to get all rooms for a specific hotel
const getOwnerRoom = async (req,res) => {

}

//API to toggle avaiability of a room
const toggleRoomAvaiability = async (req,res) => {

}


export {
    createRoom,
    getRoom,
    getOwnerRoom,
    toggleRoomAvaiability
}
