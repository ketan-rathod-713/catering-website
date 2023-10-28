// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import Cart from "../../../models/Cart.js"
import User from './../../../models/User';
import Review from "../../../models/Review.js";
import authoriseUser from "../../../utils/authoriseUser.js"

export default async function handler(req, res){
    if(req.method === "GET"){ // get all the users
        try {
          // only for admin access role 
            await connectDB();
            const reviews = await Review.find({});
            res.status(200).json(reviews);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    // create user // signup method
    else if(req.method === "POST"){
      const {rating, reviewText} = req.body;
      console.log(rating, reviewText)
      try{
        await connectDB();
        // authorise user and create Review
        const decodedToken = await authoriseUser(req);

        // check if it is the first review or not.
        const reviews = await Review.find({user: decodedToken["_id"]})
        if(reviews.length > 0){
            return res.status(400).json({error: "You have already added rating so now you can only update it."})
        }

        const review = new Review({
            user: decodedToken["_id"],
            reviewText,
            rating
        })
        await review.save()

        res.status(200).json(review)
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