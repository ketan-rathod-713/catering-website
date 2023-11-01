import React, { useState } from "react";
import { resetCartProducts, resetCartProductsAsync, selectUserCartProducts } from './../../store/cart/cartReducer';
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { editCartProductAsync, deleteCartProductAsync, selectCartTotalPrice } from "./../../store/cart/cartReducer";
import { useDispatch } from "react-redux";
import PagePadding from "../../components/PagePadding";
import Navbar from "../../components/Navbar";
import PageHeading from "../../components/PageHeading";
import { createNewOrder } from "../../store/order/orderAPI";
import { createNewOrderAsync, currentOrderFullfilled, setCurrentOrderFullfilledToFalse } from "../../store/order/orderReducer";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { CREATE_NEW_ORDER } from "../../data/orderPostTypes";
import logo from "../../public/intro.jpg"

const Checkout = () => {
    const userCartProducts = useSelector(selectUserCartProducts);
    const cartTotalPrice = useSelector(selectCartTotalPrice);
    const [addressInput, setAddressInput] = useState("");
    const [paymentOption, setPaymentOption] = useState("");
    const router = useRouter();
    const currentOrderFullFilledStatus = useSelector(currentOrderFullfilled)
    
    const dispatch = useDispatch();

    const loadScript = (src) =>  {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
}

const displayRazorpay = async () => {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({totalPrice: cartTotalPrice, type: CREATE_NEW_ORDER}),
        headers:  {
            "Content-Type": "application/json"
        }
    })

    const data = await result.json()
    console.log("data after creating razorpay order ",data);
    const {amount, id, currency, receipt} = data["razorpayOrder"];

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const options = {
        key: "rzp_test_ihCuvpPG2J9MtI", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Nakalang Caterers",
        description: "Pay Order Money",
        image: {  },
        order_id: id,
        handler: async function (response) {
            console.log("response is",response)
            console.log("id is",id)
            const data = {
                receipt,
                orderCreationId: id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                // order related information
                address: addressInput, paymentOption: paymentOption, products: userCartProducts, totalPrice: cartTotalPrice
            };

            const result = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            const output = await result.json()

            console.log(output);
            
            dispatch(resetCartProductsAsync())
            router.push("/shop/order") // instead show successfull massage static and give route to view all orders // TODo
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

    const handleOrderNowClick = async ()=>{
        // make order request and route it to my orders or home page
        console.log("address here", userCartProducts, cartTotalPrice, paymentOption); // don't take this cart total price as it is calculate there to and then decide.
        dispatch(createNewOrderAsync({address: addressInput, paymentOption: paymentOption, products: userCartProducts, totalPrice: cartTotalPrice}))

        // now go to order page if it is successfull.
    }

    const editProductQuantityInCart = async (product, newQuantity) => {
        dispatch(editCartProductAsync({product, quantity: newQuantity}))
    }

    const deleteProductFromCart = async product => {
        dispatch(deleteCartProductAsync({product}))
    }

    if(currentOrderFullFilledStatus){
        dispatch(setCurrentOrderFullfilledToFalse())
        dispatch(resetCartProductsAsync())
        router.push("/shop/order")
    }

  return <div>
  <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
    <Script type="application/javascript"></Script>

         <Navbar/>

{/* body */}
<PagePadding>
    <PageHeading>YOUR ORDER</PageHeading>

    <div className="my-10">
        <h1 className="text-xl font-bold">Order Details</h1>
        <div className="grid grid-cols-4 mt-4 gap-5">
            <div className="flex-col flex col-span-4">
                <label htmlFor="name">Address</label>
                <textarea type="text" value={addressInput} onChange={(e)=>setAddressInput(e.target.value)} name="address" placeholder="Enter Complete Address Including City, Area, Street Address, Pincode, etc.." className="py-3 px-3 border-2 h-20 border-gray-400"/>
            </div>
        </div>
    </div>

    <div className="my-10">
        <h1 className="text-xl font-bold">Payment Options</h1>
        <div className="flex flex-col space-y-5 mt-5">
            <div className="flex items-center space-x-5">
                <input type="radio" name="paymentOption" value="cash" onClick={(e)=>setPaymentOption(e.target.value)} className="h-5 w-5"/>
                <span>Cash On Delivery</span>
            </div>
            <div className="flex items-center space-x-5">
                <input type="radio" name="paymentOption" value="online" onClick={(e)=>setPaymentOption(e.target.value)} className="h-5 w-5"/>
                <span>Online</span>
            </div>
        </div>
    </div>

    <div className="grid grid-cols-4 gap-5">

    {/* left all products */}
        <div className="flex-col space-y-10 col-span-4 lg:col-span-3">
            {
                userCartProducts.map((cartItem, index)=>
                    <div key={index} className="grid grid-cols-6 gap-4 lg:gap-6">
                        <div className="col-span-2 md:col-span-1 lg:px-5">
                            <Image width={1000} height={1000} src={`${cartItem.product.image}`} className="w-full aspect-square rounded-sm shadow-sm"/>
                        </div>
                        <div className="col-span-4 lg:col-span-5 flex flex-col space-y-2">
                            <Link className="text-xl hover:text-blue-500 duration-300" href={`/shop/product/${cartItem.product._id}`}>{cartItem["product"]["title"]}</Link>
                            <div className="text-md text-gray-500">{cartItem.product.category}</div>
                            <div className="text-md text-gray-500">
                                TODO: Rating Here
                            </div>

                            <div className="flex space-x-2 lg:space-x-5">
                                <div className="font-bold text-xl">
                                ₹{cartItem.product.price}
                                </div>
                                <select value={cartItem.quantity} onChange={(e)=>editProductQuantityInCart(cartItem.product, e.target.value)} className="border-2 border-gray-200 px-4 py-1">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                </select>
                                <button className="text-red-600" onClick={(e)=> deleteProductFromCart(cartItem.product)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                                
                            </div>
                        </div>
                        {/* <div className="col-span-1">{cartItem._id}</div> */}
                    </div>
                )
            }
        </div>

        <div className="col-span-4 lg:col-span-1 mt-10 lg:mt-">
            <div className="text-center lg:text-left text-gray-500 text-2xl font-bold">
                Price Details
            </div>
            <div className="flex flex-col mt-10 space-y-5 text-xl">
                <div className="flex justify-between">
                    <div>Price</div>
                    <div>{cartTotalPrice}</div>
                </div>
            </div>
            <div className="flex justify-between font-bold text-xl mt-10">
                <div>Total Amount </div>
                <div>{cartTotalPrice}</div>
            </div>
            <div className="flex justify-center mt-10">
                <button className="py-2 px-5 bg-blue-600 rounded-sm text-white" onClick={displayRazorpay}>Order Now</button>
            </div>
        </div>
    </div>
</PagePadding>
  </div>;
};

export default Checkout;
