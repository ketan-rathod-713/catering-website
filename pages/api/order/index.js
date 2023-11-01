// / product
import Order from "../../../models/Order.js";
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import authoriseUser from "../../../utils/authoriseUser.js"
import authoriseAdmin from "../../../utils/authoriseAdmin.js"
import { sendEmail } from "../../../utils/emailService.js";
import { CREATE_NEW_ORDER, DELIVER_ORDER, EDIT_ORDER_DETAILS, ASSIGN_DELIVERY_DATE, CANCEL_ORDER_WITH_MESSAGE} from "../../../data/orderPostTypes.js";
import { DELIVERED, ONGOING } from './../../../data/orderStatus';
import Razorpay from "razorpay"

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
    
    // create order // any user can do it
    else if(req.method === "POST"){
      const {type} = req.body;

      if(type === CREATE_NEW_ORDER){
        
      const {address, products, totalPrice, paymentOption} = req.body;
      console.log(paymentOption)
      console.log(typeof(paymentOption))
      // get user from cookies
      try{
        await connectDB();
        const decodedToken = await authoriseUser(req); // check if it is correct user or not 

        if(decodedToken){
          // calculate totalPrice 
          console.log("totalPrie", totalPrice)

          const order = new Order({address, products, user: decodedToken["_id"], totalPrice: totalPrice, paymentOption: paymentOption, status: ONGOING})
          await order.save();

          // order is saved hence get the _id of order and do razorpay stuff.
          const instance = new Razorpay({
            key_id : "rzp_test_ihCuvpPG2J9MtI",
            key_secret: "twcCr6gHv67KIjJwBJRXoybz"
          });

          const options = {
            receipt: order._id,
            currency: "INR",
            amount: totalPrice,
            payment_capture: 1
          }

          const razorpayOrder = await instance.orders.create(options)

          // order is saved hence send Email to this user.
          
          console.log(razorpayOrder);
          res.status(200).json(razorpayOrder)
        } else {
          res.status(200).json({message: "Not authenticated"})
        }
        
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
      } else if(type === EDIT_ORDER_DETAILS){

      } else if(type === DELIVER_ORDER){
        const {orderId} = req.body;
        // deliver it done
        await connectDB();
        const decodedToken = await authoriseAdmin(req);

        if(decodedToken){
          // now change order status to delivered;
          // check if it is not already delivered
          const order = await Order.updateOne({_id: orderId}, {status: DELIVERED, deliveryDate: new Date()})
          console.log("updated",order)

          return res.status(200).json(order)
        } else {
          res.status(200).json({message: "Not authenticated"})
        }
      } else if(type === ASSIGN_DELIVERY_DATE){

      } else if(type === CANCEL_ORDER_WITH_MESSAGE){

      }
      
    }

    // edit order -> status suuch as ongoing, etc.
}