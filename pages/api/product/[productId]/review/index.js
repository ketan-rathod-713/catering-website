// / product
import authoriseUser from "../../../../../utils/authoriseUser.js"
import ProductReview from "../../../../../models/ProductReview.js";
import connectDB from "../../../../../utils/mongooseConnect.js";
import mongoose from "mongoose";
import Product from "../../../../../models/Product.js";

export default async function handler(req, res){
    if(req.method === "GET"){ // get all the users
        try {
            const {productId} = req.query;
          // only for admin access role 
            await connectDB();
            const reviews = await ProductReview.find({product: productId}).populate("user").exec()
            res.status(200).json(reviews);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    // create user // signup method
    else if(req.method === "POST"){
        const {productId} = req.query;
      const {rating, reviewText} = req.body;
      console.log(rating, reviewText)
      try{
        await connectDB();
        // authorise user and create Review
        const decodedToken = await authoriseUser(req);
        console.log(decodedToken)
        // check if it is the first review or not.
        const reviews = await ProductReview.find({user: decodedToken["_id"], product: productId})
        if(reviews.length > 0){
            return res.status(400).json({error: "You have already added rating so now you can only update it."})
        }
        
        const review = new ProductReview({
            user: decodedToken["_id"],
            product: productId,
            reviewText,
            rating
        })
        await review.save()

        const pipeline = [
          {
            $match: {
              product: new mongoose.Types.ObjectId(productId),
            }
          },
          {
            $group: {
              _id: "$product",
              averageRating: { $avg: "$rating" }
            }
          }
        ];
        
        const averageRatingResult = await ProductReview.aggregate(pipeline).exec();

        console.log("rating ", averageRatingResult)
        if(averageRatingResult[0]){
          const product = await Product.updateOne({_id: productId}, {
            $set: {averageRating: averageRatingResult[0].averageRating},
          })
          console.log(product)
        }

        res.status(200).json(review)
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    }
}