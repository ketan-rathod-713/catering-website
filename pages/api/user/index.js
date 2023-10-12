// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../db/mongooseConnect.js";
import User from './../../../models/User';

export default async function handler(req, res){
    if(req.method === "GET"){ // get all the users
        try {
          // only for admin access role 
            await connectDB();
            const users = await User.find();
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    // create product
    else if(req.method === "POST"){
      const {name, email, phone, password} = req.body;
      try{
        await connectDB();
        const user = new User({name, email, password, phone})
        await user.save();
        
        res.status(200).json(user)
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    }
}