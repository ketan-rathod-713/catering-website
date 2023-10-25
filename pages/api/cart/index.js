// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import Cart, { cartProductSchema } from './../../../models/Cart';
import authoriseUser from "../../../utils/authoriseUser.js";
import { ADD_PRODUCT, EDIT_QUANTITY, EMPTY_CART, REMOVE_PRODUCT } from './../../../data/actionTypes';

const calculateTotalPrice = (products)=>{
    const totalPrice = products.reduce((total, product) => {
      // Assuming each product has a price and quantity property
      return total + (product.product.price * product.quantity);
  }, 0);

return totalPrice;
}

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
      const {type} = req.body;

      await connectDB();
      const decodedToken = await authoriseUser(req)
      console.log("Decoded Token Log ",decodedToken);

      if(type === ADD_PRODUCT){
        const {product, quantity} = req.body;
        product["quantity"] = quantity || 1; // by default 1 if not specified
        // check if product already there in cart then increase quantity
        const cartThere = await Cart.findOne({user: decodedToken["_id"]})
        const products = cartThere["products"]
        
        const Filtered = products.filter((p)=> p["product"] == product["_id"]);
        console.log("filtered ", Filtered);

        if(Filtered.length > 0){
          // increment this products quantity by 1
          const cart = await Cart.findOneAndUpdate({user: decodedToken["_id"], 'products.product': product["_id"]}, {
            $inc: { 'products.$.quantity': 1 }
          }, {new: true})

    
          res.status(200).json({cart})
        } else {
          // add product to products

          const cart = await Cart.findOneAndUpdate(
            {user: decodedToken["_id"]}, {
              $push: { products: {product: product["_id"], quantity: 1} },
          }, {new: true})
          console.log("Updated Cart log ",cart);
          res.status(200).json({cart})
        }

      } else if(type === EDIT_QUANTITY){
        const {product, quantity} = req.body;
          // i am given product and quatity 
          console.log("quantity ", quantity)
          const cart = await Cart.findOneAndUpdate({user: decodedToken["_id"], 'products.product': product["_id"]}, {
            $set: { 'products.$.quantity': quantity }
          }, {new: true})
          console.log(cart)
          res.status(200).json({cart})
      } else if(type === REMOVE_PRODUCT){
        const {product, quantity} = req.body;
          // only need product
          const cart = await Cart.findOneAndUpdate({user: decodedToken["_id"]}, {
            $pull: { "products": {"product": product["_id"]} }
          }, {new: true})

          console.log(cart)

          res.status(200).json({cart})
      } else if(type === EMPTY_CART){
          // only need cart information
          const cart = await Cart.findOneAndUpdate({user: decodedToken["_id"]}, {
            $set: { "products": []} }
          , {new: true})

          res.status(200).json({cart})
      }
    }
}