import mongoose from 'mongoose';



const  connectDB = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/dreams_international")
    .then(()=>{
        console.log('Database Connected successfully');
    })
    .catch((error)=>{
        console.log(error);
 
    })
}
export default connectDB;



