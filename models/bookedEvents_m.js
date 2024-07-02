import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events', 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const BookingModel = mongoose.model("booking", bookingSchema);

export default BookingModel;
