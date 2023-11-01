import Razorpay from "razorpay";
import Order from "../../../models/Order";
import { ONGOING } from "../../../data/orderStatus";
import authoriseUser from "../../../utils/authoriseUser";

export default async function handler(req, res){
    if(req.method === "POST"){
        const {razorpayOrderId, orderCreationId, razorpayPaymentId, razorpaySignature} = req.body;
        const {address, products, totalPrice, paymentOption} = req.body;

        const instance = new Razorpay({
                key_id : "rzp_test_ihCuvpPG2J9MtI",
                key_secret: "twcCr6gHv67KIjJwBJRXoybz"
            });

            console.log("totalPrice", totalPrice) // TODO - CONFIRM IT IS SAME AT BOTH PLACES Razorpay and all products.

            try {
                const decodedToken = await authoriseUser(req)
                if(decodedToken){
                  const razorpayPaymentInfo = await instance.payments.fetch(razorpayPaymentId);

                  const paymentInfo = {
                    paymentId: razorpayPaymentId,
                    amount: razorpayPaymentInfo["amount"],
                    status: razorpayPaymentInfo["status"],
                    currency: razorpayPaymentInfo["currency"],
                  }

                  const order = new Order({address, products, user: decodedToken["_id"], totalPrice: totalPrice, paymentOption: paymentOption, status: ONGOING, payment: paymentInfo})
                  await order.save();
                  
                  console.log(razorpayPaymentInfo)
                  return res.status(200).json({order, razorpayPaymentId}) // return other info too if required
                } else {
                  return res.json({error: "You are not authenticated"})
                }
              } catch (error) {
                // Handle errors appropriately
                console.error(error);
                return res.status(500).json({ error: "An error occurred." });
              }
    }
}