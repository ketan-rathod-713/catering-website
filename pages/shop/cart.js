import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import PagePadding from "../../components/PagePadding";
import PageHeading from "../../components/PageHeading";
import Image from "next/image";
import Link from "next/link";
import Cart from "../../models/Cart";
import authoriseUser from "../../utils/authoriseUser";
import mongoose from "mongoose";
import CircularJSON from "circular-json"
import { EDIT_QUANTITY, REMOVE_PRODUCT } from "../../data/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import {selectCartTotalPrice ,deleteCartProductAsync, editCartProductAsync, fetchCartDataAsync, selectUserCartProducts, setCartProductsFromServerSideProps } from "../../store/cart/cartReducer";

const CartPage = ({cart}) => {      
    const router = useRouter();
    const dispatch = useDispatch()
    const userCartProducts = useSelector(selectUserCartProducts);
    const cartTotalPrice = useSelector(selectCartTotalPrice);

    useEffect(()=>{
        console.log("useEffect gets", cart);
        dispatch(setCartProductsFromServerSideProps(cart["products"]))
    }, [])

    const editProductQuantityInCart = async (product, newQuantity) => {
        dispatch(editCartProductAsync({product, quantity: newQuantity}))
    }

    const deleteProductFromCart = async product => {
        dispatch(deleteCartProductAsync({product}))
    }

    const handleCheckoutClick = async ()=>{
        router.push("/shop/checkout")
    }
  return <div className="w-[100vw]">
      {/* navbar */}
      <Navbar/>

{/* body */}
<PagePadding>
    <PageHeading>CART</PageHeading>

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
                <button className="py-2 px-5 bg-blue-600 rounded-sm text-white" onClick={handleCheckoutClick}>Checkout</button>
            </div>
        </div>
    </div>
</PagePadding>
  </div>;
};

export default CartPage;

export async function getServerSideProps(context){
    const {req} = context;
    const decodedToken = await authoriseUser(req)

    if(!decodedToken){
        return {
            redirect: {
              destination: "/auth/login",
              permanent: false
            }
          }
    }

    console.log(decodedToken)
    const cart = await Cart.findOne({user: decodedToken["_id"]}).populate("products.product").exec()
    
    const serialised = CircularJSON.stringify(cart)
    const jsonOne = CircularJSON.parse(serialised)

   

    return {
        props: {
            cart: jsonOne
        }
    }
}
