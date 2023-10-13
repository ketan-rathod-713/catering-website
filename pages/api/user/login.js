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
           
            const payload = {
                name: user["name"],
                email: user["email"],
                phone: user["phone"]
            };
            const token = jwt.sign(payload, SECREAT_KEY)
            console.log(user);
            if(user){
                // add logic for creation of tokens
                res.status(200).json({token})
            } else {
                res.status(400).json({error: "give valid inputes"})
            }
        } catch(err){
            res.status(400).json({error: "an error occured"})
        }
    }
}