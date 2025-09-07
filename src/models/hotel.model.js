import mongoose , {Schema} from "mongoose";

const hotelSchema = new Schema ( {
    name : {
        type : String,
        required : [true , "username is required"],
        trim : true
    },
    address : {
        type : String,
        required : [true , "email is required"],
        trim : true,
        unique : true,
    },
    contact : {
        type : String,
        required : true
    },
    owner : {
        type : String,
        required : true,
        ref : 'User'
    },
    city : {
        type : String,
        required : true
    },
},
{
    timestamps : true
});

export const Hotel = mongoose.model.Hotel ?? mongoose.model('Hotel' , hotelSchema);