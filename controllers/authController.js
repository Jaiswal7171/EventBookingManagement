import UserModel from "../models/users.js";
import bcrypt from 'bcryptjs';
import { genrattoken } from '../middlewares/middleware.js';



class AuthController {



// User Regsiter Code
    
    static userRegistration = async (req, res) => {
        try {
            const { name, email, password ,role } = req.body; // get all data from body

            if (!name || !email || !password || !role) {
                return res.status(400).json({ message: 'All fields  mandatory' });
            }


            const existingUser = await UserModel.findOne({ email: email });

            if (existingUser) {
                return res.status(400).json({ message: 'Sorry, email already exists' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = new UserModel({
                    name: name,
                    email: email,
                     password: hashedPassword,
                     role :role
                });

                const savedUser = await newUser.save();

                // Generate JWT token ans save id and role in token 
                const payload = {
                    id: savedUser._id,
                    role: savedUser.role
                };

                const gettoken  =  genrattoken(payload)
                return res.status(201).json({ message: 'User registered successfully' ,"userToken": gettoken });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: "Error when saving the user" ,error: error.message });
        }
    }




//user Login Code  

static userLogin = async(req,res)=>{
    try{
        const { email,password} = req.body


        if (!email || !password) {
            return res.status(400).json({ message: 'All fields  mandatory' });
        }


        const cheakUser = await UserModel.findOne({email: email});
        if(cheakUser != null){
            const ismatch  = await bcrypt.compare(password, cheakUser.password)

            if((cheakUser.email === email) && ismatch){

                // in payload  i save login user id and role 
                const payload = {
                    id: cheakUser._id,
                    role: cheakUser.role
                };
                const gettoken = genrattoken(payload);
                return res.status(200).json({status:"sucess",message:"welcome bro !" , role :cheakUser.role , token: gettoken})
            }else{
                return res.status(400).json({status:"error",message:"Incorrect"})
            }
        }else{
            return res.status(500).json({status:"error",message:"Email Not Found !"})
        }

    }catch(error){
    console.log(error);
    return res.status(500).json({status:"error",message :"Error here"})
    }
}


        
}





export default AuthController;
