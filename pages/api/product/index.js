// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../db/mongooseConnect.js";

connectDB()

export default async function handler(req, res){
    if(req.method === "GET"){ // get all products
        try {
            const products = await Product.find();
            res.status(200).json(products);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } else if(req.method === "POST"){

    }
}