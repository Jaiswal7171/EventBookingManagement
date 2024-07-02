import mongoose from "mongoose";

const eventDetailsSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'events', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    speakerName: { type: String, required: true, trim: true },
    event_topic: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    description: { type: String, trim: true }
});

const EventDetailsModel = mongoose.model("eventDetails", eventDetailsSchema);

export default EventDetailsModel;
