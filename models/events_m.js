import mongoose from "mongoose";


const eventscehma = new mongoose.Schema({

        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        date: { type: Date, required: true, trim: true },
        time: { type: String, required: true, trim: true },
        capacity: { type: Number, required: true, trim: true },
        userid: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }

})



const EventModel = mongoose.model("events",eventscehma)

export default EventModel


