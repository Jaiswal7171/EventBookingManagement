import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import connectDB  from './connection/db.js'
import userRoutes from './routes/userRoutes.js'


const app = express()
const port  = process.env.port
const DATABASE_URL = process.env.DATABASE_URL

//DATABSE CONNECTION fucntion call
connectDB()


//JSON DATA 
app.use(express.json())

//user Routes
app.use("/api",userRoutes)



app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`)
})


