// / product
import authoriseUser from "../../../../../utils/authoriseUser.js"
import ProductReview from "../../../../../models/ProductReview.js";
import connectDB from "../../../../../utils/mongooseConnect.js";

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

        res.status(200).json(review)
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    }
}