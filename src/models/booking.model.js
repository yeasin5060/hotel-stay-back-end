import mongoose , {Schema} from "mongoose";

const bookingSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    room : {
        type : Schema.Types.ObjectId,
        ref : 'Room',
        required : true
    },
    hotel : {
        type : Schema.Types.ObjectId,
        ref : 'Hotel',
        required : true
    },
    checkInDate : {
        type : Date ,
        required : true
    },
    checkOutDate : {
        type : Date ,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    guests: {
        type : Number ,
        required : true
    },
    status : {
        type : String ,
        enum : ['pending', 'confirmed' , 'cancelled'],
        default : 'pending'
    },
    paymentMethod : {
        type : String,
        required : true,
        default : 'Pay At Hotel'
    },
    isPaid : {
        type : Boolean ,
        default : false
    },
},{
    timestamps : true
});

export const Booking = mongoose.model.Booking ?? mongoose.model('Booking' , bookingSchema);