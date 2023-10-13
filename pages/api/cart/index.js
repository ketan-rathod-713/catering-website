// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import Cart from './../../../models/Cart';

export default async function handler(req, res){
    if(req.method === "GET"){ // get all products, based on filters too
        try {
            await connectDB();
            const cart = await Cart.findOne({});
            res.status(200).json(cart);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    // add products to cart
    else if(req.method === "POST"){
      const {products, quantity} = req.body;
      try{
        await connectDB();
        const product = 
        await product.save();

        res.status(200).json(product)
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    }
}