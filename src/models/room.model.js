import mongoose , {Schema} from "mongoose";

const roomSchema = new Schema({
    hotel: {
        type : Schema.Types.ObjectId,
        ref : 'Hotel',
        required : true
    },
    roomType : {
        type : String,
        required : true
    },
    pricePerNight: {
        type : Number,
        required : true
    },
    amenities : {
        type : Array,
        required : true
    },
    image : [{
        type : String,
    }],
    isAvailable : {
        type : Boolean,
        default : true
    },
},{
    timestamps : true
})

export const Room = mongoose.model.Room ?? mongoose.model('Room' , roomSchema);