import jwt from "jsonwebtoken";
import SECREAT_KEY from "../data/secreateKey";
import Cookies from "cookies";
import User from './../models/User';

export default async function authoriseAdmin(req){
    try {

        const cookie = new Cookies(req);
        const token = cookie.get("token");
    
        if(token){
            jwt.verify(token, SECREAT_KEY);
            console.log("token verified");

            const decodedToken = jwt.decode(token)
            // console.log(decodedToken)
            const user = await User.find({_id: decodedToken["_id"]}).select("admin email").exec()
            // console.log(user)
            if(user[0] && user[0].admin === true){
                return decodedToken;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch(err){
        console.log(err);
        return null;
    }
}