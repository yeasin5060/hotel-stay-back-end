import mongoose , {Schema} from "mongoose";

const userSchema = new Schema( {
        id : {
            type : String,
            required : true,
            trim : true
        },
        userName : {
            type : String,
            required : [true , "username is required"],
            trim : true
        },
        email : {
            type : String,
            required : [true , "email is required"],
            trim : true,
            unique : true,
            lowercase : true
        },
        image : {
            type : String,
            required : true
        },
        role : {
            type : String,
            enum : ['user', 'hotelowner'],
            default : 'user'
        },
        recentSearchedCities : [{
            type : String,
            required : true
        }],
    },
    {
        timestamps : true,
    });

    export const User = mongoose.model.User ?? mongoose.model('User' , userSchema)

    export default User