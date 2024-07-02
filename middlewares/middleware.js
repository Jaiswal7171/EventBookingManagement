import jwt from 'jsonwebtoken';
import UserModel from "../models/users.js";



const jwtmiddleware = async (req, res, next) => {

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error :"token not found , Plz Login The Application"});


    try {
        // get token from headers
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Authorization token missing" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(403).json({ error: "Token is not valid" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};


// middleware for chekorganizer role 


const checkOrganizerRole = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
        req.user = decoded; 

        const user = await UserModel.findById(req.user.id);
        // console.log(user);
        if (!user || user.role !== 'organizer') {
            return res.status(403).json({ message: 'Sorry, you are not an organizer' });
        }

        next();
    } catch (error) {
        console.error('Error in checkOrganizerRole middleware:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};


const genrattoken = (userdata) => {
    return jwt.sign(userdata, process.env.JWT_SCERET_KEY, { expiresIn: '30d' });
};

export { jwtmiddleware, genrattoken , checkOrganizerRole };
