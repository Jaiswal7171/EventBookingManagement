import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authController.js';
import EventController from '../controllers/eventsController.js';

import { jwtmiddleware , checkOrganizerRole} from '../middlewares/middleware.js';


// authentication routes
router.post('/register', AuthController.userRegistration); 
router.post('/login', AuthController.userLogin); 



        
// get all events , event details , booked events , 


router.get('/events', jwtmiddleware ,EventController.getevents);


router.get('/eventsdetails/:eventId', jwtmiddleware ,EventController.getEventDetails);


router.post('/eventbooking/:eventId', jwtmiddleware,EventController.bookedEvents);






//evnts route for organizer 

router.post('/addevents', jwtmiddleware , checkOrganizerRole ,EventController.addEvents);


router.post('/addeventsdetails/:eventId', jwtmiddleware , checkOrganizerRole ,EventController.addeventdetails);


//update evenets
router.put('/editevents/:id',jwtmiddleware , checkOrganizerRole, EventController.editEvents);


//Deleet evenets
router.delete('/eventdelete/:id',jwtmiddleware , checkOrganizerRole, EventController.Eventdelete);

//view attendace for admin 

router.get('/eventsattendance/:eventId', jwtmiddleware, checkOrganizerRole, EventController.attendance);






export default router;
