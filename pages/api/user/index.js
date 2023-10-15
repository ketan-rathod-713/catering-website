// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import Cart from "../../../models/Cart.js"
import User from './../../../models/User';

export default async function handler(req, res){
    if(req.method === "GET"){ // get all the users
        try {
          // only for admin access role 
            await connectDB();
            const users = await User.find({});
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    // create user // signup method
    else if(req.method === "POST"){
      const {name, email, phone, password} = req.body;
      try{
        await connectDB();

        // see if already user present
        const userAlreadyPresent = await User.findOne({email: email});
        if(userAlreadyPresent){ // then present
          res.status(203).json({message: "An account exists with given emailId"})
        } else {
          const user = new User({name, email, password, phone})
          await user.save();
          
          const cart = new Cart({user: user })
          await cart.save()

          res.status(200).json({user: user, cart: cart})
        }

      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    } else if(req.method === "PUT"){
      const {user} = req.body; // here data is user data => phone, email, etc.
      console.log(user);
      try{
        await connectDB();
        const updatedUser = await User.findOneAndUpdate({email: user.email}, 
          {
            $set: {
              name: user['name'], // Update the name
              email: user['email'], // Update the email
              phone: user['phone'], // Update the phone
              address: user["address"]
              // Add more fields here that you want to update
            }
          })

        console.log(updatedUser);
        res.status(200).json({user: updatedUser})
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    }
}