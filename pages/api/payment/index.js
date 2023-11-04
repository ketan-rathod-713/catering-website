import Razorpay from "razorpay";
import Order from "../../../models/Order";
import { ONGOING } from "../../../data/orderStatus";
import authoriseUser from "../../../utils/authoriseUser";
import Payment from './../../../models/Payment';
import crypto from "crypto"

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
                  const text = `${razorpayOrderId}|${razorpayPaymentId}`;
                  const expectedSignature = crypto
                    .createHmac("sha256", "twcCr6gHv67KIjJwBJRXoybz")
                    .update(text)
                    .digest("hex");

                  if (expectedSignature === razorpaySignature) {
                    // Signature is valid
                    console.log("Payment signature is valid");
                  } else {
                    // Signature is invalid
                    console.error("Payment signature is invalid");
                    return res.status(400).json({ error: "Invalid payment signature" });
                  }

                  const razorpayPaymentInfo = await instance.payments.fetch(razorpayPaymentId);

                  const paymentInfo = {
                    paymentId: razorpayPaymentId,
                    amount: razorpayPaymentInfo["amount"],
                    status: razorpayPaymentInfo["status"],
                    currency: razorpayPaymentInfo["currency"],
                    time: razorpayPaymentInfo["created_at"],
                    error: razorpayPaymentInfo["error_description"],
                    paymentOption: paymentOption
                  }

                  const payment = new Payment(paymentInfo);
                  await payment.save()

                  const order = new Order({address, products, user: decodedToken["_id"], totalPrice: totalPrice, paymentOption: paymentOption, status: ONGOING, payment: payment})
                  await order.save();

                  // put order details in payment schema 
                  let updatedPayment = await Payment.findByIdAndUpdate(payment._id, {$set:{order: order._id}})
                  
                  return res.status(200).json({order, updatedPayment}) // return other info too if required
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