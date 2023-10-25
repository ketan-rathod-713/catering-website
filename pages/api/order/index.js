// / product
import Order from "../../../models/Order.js";
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import authoriseUser from "../../../utils/authoriseUser.js"

export default async function handler(req, res){
    if(req.method === "GET"){ // fetch all orders for admin
        try {
            await connectDB();
            const decodedToken = await authoriseUser(req)
            // ADMIN TODO : check if he is admin or not

            const orders = await Order.find();
            res.status(200).json(orders);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    // create order
    else if(req.method === "POST"){
      const {address, products, totalPrice, paymentOption} = req.body;
      
      // get user from cookies
      try{
        await connectDB();
        const decodedToken = await authoriseUser(req); // check if it is correct user or not 

        if(decodedToken){
          const order = new Order({address, products, user: decodedToken["_id"], totalPrice, paymentOption})
          await order.save();

          res.status(200).json(order)
        } else {
          res.status(200).json({message: "Not authenticated"})
        }
        
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
    }

    // edit order -> status suuch as ongoing, etc.
}