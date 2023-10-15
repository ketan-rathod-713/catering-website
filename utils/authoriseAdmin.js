import jwt from "jsonwebtoken";
import SECREAT_KEY from "../data/secreateKey";
import Cookies from "cookies";
import User from './../models/User';

export default async function handler(context){
    try {
        const {req} = context;

        const cookie = new Cookies(req);
        const token = cookie.get("token");
    
        if(token){
            jwt.verify(token, SECREAT_KEY);
            console.log("token verified");

            // get user name and then return user information
            const tokenPayload = jwt.decode(token)
            const user = User.findOne({email: tokenPayload.email}).select("email phone name")
            return user;
        } else {
            return null;
        }
    } catch(err){
        console.log(err);
        return null;
    }
}