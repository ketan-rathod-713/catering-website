import connectDB from "../../../utils/mongooseConnect";
import User from "../../../models/User";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import SECREAT_KEY from "../../../data/secreateKey"

export default async function handler(req, res){
    if(req.method === "POST"){
        try {
            const { email, password } = req.body;
            await connectDB();
            const user = await User.findOne({email: email, password: password})
           
            if(user){
                // add logic for creation of tokens
                const payload = {
                    _id: user["_id"],
                    name: user["name"],
                    email: user["email"],
                    phone: user["phone"],
                    admin: user["admin"]
                };
                
                const token = jwt.sign(payload, SECREAT_KEY)
                console.log(user);
                res.status(200).json({token})
            } else {
                res.status(400).json({error: "give valid user email and password"})
            }

        } catch(err){
            res.status(400).json({error: "an error occured"})
        }
    }
}