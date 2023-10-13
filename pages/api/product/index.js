// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";

export default async function handler(req, res){
    if(req.method === "GET"){ // get all products, based on filters too
        try {
            await connectDB();
            const products = await Product.find();
            res.status(200).json(products);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    // create product
    else if(req.method === "POST"){
      const {title, description, price, category, image} = req.body;
      try{
        await connectDB();
        const product = new Product({title, description, price, category, image})
        await product.save();

        res.status(200).json(product)
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    }
}