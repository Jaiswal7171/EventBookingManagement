import EventModel from "../models/events_m.js";
import EventDetailsModel from "../models/eventDetails_m.js";
import BookingModel from "../models/bookedEvents_m.js";


class  EventController {



// add events  api for Organizer

    static addEvents = async (req, res) => {
        try {
            const { title, description, city, location, date, time, capacity } = req.body;

            
            if (!title || !description || !city || !location || !date || !time || !capacity ) {
                return res.status(400).json({ message: 'All fields  mandatory' });
            }


            const newEvent = new EventModel({
                title: title,
                description: description,
                city: city,
                location: location,
                date: new Date(date), 
                time: time,
                capacity: capacity,
                userid: req.user.id // jwt get login id 
            });
    
          
            const saved = await newEvent.save();
            res.status(201).json({ message: "Event added successfully", savedEvent: saved });

        } catch (error) {
            console.error("Error occurred while adding the event:", error);
            res.status(500).json({ message: "Error occurred while adding the event", error: error.message });
        }
    };
            

// add events details

        static addeventdetails = async (req, res) => {
            try {
                const { speakerName, event_topic, duration, description } = req.body;

                if (!speakerName || !event_topic || !duration || !description  ) {
                    return res.status(400).json({ message: 'All fields  mandatory' });
                }

                const eventId = req.params.eventId; // i m get here  eventId from  url

                const Eventdetails = new EventDetailsModel({
                    speakerName: speakerName,
                    event_topic: event_topic,
                    duration: duration,
                    description: description,
                    userId: req.user.id,
                    eventId: eventId
                });
    
                const saved = await Eventdetails.save();
                res.status(201).json({ message: "Event Descrip. added successfully Base On Event id", EventDetails: saved });

            } catch (error) {
                console.log(error);
                return res.status(500).json({ status: "error", message: "Error here", error: error.message });
            }
        };




// get events data

    static getevents = async(req,res)=>{
        try{
            const events = await EventModel.find();
            return res.status(200).json({status:"sucess",message:"All Events Here",events})
            }catch(error){
            console.log(error);
            return res.status(500).json({status:"error",message :"Error here" ,  error: error.message})
        }
    
    }



    
// get events details


    static getEventDetails = async (req, res) => {
        try {
            const eventId = req.params.eventId;

            if (!eventId) {
                return res.status(400).json({ message: "Please provide Event ID." });
            }
    
            const checkEventId = await EventModel.findById(eventId);
            if (!checkEventId) {
                return res.status(404).json({ message: "Event ID is incorrect." });
            }
    
            const eventDetails = await EventDetailsModel.find({ eventId });
            return res.status(200).json({ status: "success", message: "Event details retrieved successfully.", events: eventDetails });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: "Event id is Wrong .", error: error.message });
        }

}





// edit events
   
            static editEvents = async (req, res) => {
                try {
                    const eventId = req.params.id;
                    const { title, description, city, location, date, time, capacity } = req.body;
        
                    const updateData = {
                        title: title,
                        description: description,
                        city: city,
                        location: location,
                        date: new Date(date),
                        time: time,
                        capacity: capacity,
                        userid: req.user.id 
                    };
        
                    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updateData, { new: true });
        
                    if (!updatedEvent) {
                        return res.status(404).json({ message: "Event not found" });
                    }
        
                    res.status(200).json({ message: "Event updated successfully", updatedEvent });
                    } catch (e) {
                        console.error(e);
                        res.status(500).json({ message: "Error occurred while adding the event" });
                    }

                }


//  delete events

    static Eventdelete = async (req, res) => {
        try {
            const eventId = req.params.id;
            const deletedEvent = await EventModel.findByIdAndDelete(eventId);
            if (!deletedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json({ message: " deleted successfully", });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Error occurred while deleting the event" });
        }
    }



//  bokked  events for users

    static bookedEvents = async (req, res) => {
        try {
            const { eventId } = req.params;
            const userId = req.user.id; 
    
            // Check if the event exists and has capacity
            if (!eventId) {
                return res.status(400).json({ message: 'Event ID is required' });
            }
    
            const event = await EventModel.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
    
            // Check if the user has already booked this event

            const alreadyBooked = await BookingModel.findOne({ event: eventId, userId: userId });
            if (alreadyBooked) {
                return res.status(400).json({ error: 'You have already booked this event' });
            }
    
            // Create a new booking
            const booking = new BookingModel({
                userId: userId, 
                eventId: eventId,
                date: event.date 
            });
    
            const newBooking = await booking.save();
            return res.status(201).json({ message: 'Booking successful', booking: newBooking });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: "Error here", error: error.message });
        }
    }




// view all attendcae for admin 
static attendance = async (req, res) => {
    try {
       
        const { eventId } = req.params; 
        // console.log(eventId);
        const bookings = await BookingModel.find({ eventId });
        // res.status(200).json(bookings); 
        return res.status(200).json({ status: "success", message: "All Attendance Here", bookings });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
};



}


export default  EventController;