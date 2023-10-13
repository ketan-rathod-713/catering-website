import jwt from "jsonwebtoken";
import SECREAT_KEY from "../data/secreateKey";
import Cookies from "cookies";

export default async function handler(context){
    try {
        const {req} = context;

        const cookie = new Cookies(req);
        const token = cookie.get("token");
    
        if(token){
            jwt.verify(token, SECREAT_KEY);
            console.log("token verified");
            return token;
        } else {
            return null;
        }
    } catch(err){
        console.log(err);
        return null;
    }
}