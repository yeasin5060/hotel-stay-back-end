import User from '../models/user.model.js'
import { Hotel } from '../models/hotel.model.js'

 export const registerHotel = async (req,res) => {
    try {
        const { name , address , contact , city} = req.body;
        const owner = req.user._id;

        //Check if user already registered

        const hotel = await Hotel.findOne({owner});

        if(hotel){
            res.json({success : false , message : "Hotel allready Register "})
        }

        await Hotel.create({name , address , contact, city, owner });
        await User.findByIdAndUpdate(owner , { role : 'hotelOwner'});
        res.json({success : true , message : 'Holel Registered Successfully'});
        
    } catch (error) {
        console.log('Hotel register error');
         res.json({success : false , message : error.message});
    }
 }