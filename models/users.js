
import mongoose from "mongoose";
const userScehma = new mongoose.Schema({
    name : { type : String , required : true , trim :true} ,
    email :{ type : String , required : true , trim :true} ,
    password :{ type : String , required : true , trim :true} ,
    role: { type: String, enum: ['user', 'organizer'], default: 'user' }

})


// this is model for user 
const UserModel = mongoose.model("user",userScehma)
export default UserModel


