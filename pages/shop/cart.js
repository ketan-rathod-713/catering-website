import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import PagePadding from "../../components/PagePadding";
import PageHeading from "../../components/PageHeading";

const Cart = ({cart}) => {      
    const router = useRouter();

    const editProductQuantityInCart = async (product, newQuantity) => {
        console.log(product, newQuantity);
    }

    const deleteProductFromCart = async product => {
        console.log(product);
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

    <div>
        {cart.user}
    </div>

</PagePadding>
  </div>;
};

export default Cart;

export async function getServerSideProps(context){
    // currently assuming only user 1 // lets use cookie later on to fetch a token from it.
    const response = await fetch("http://localhost:4000/cart/1")
    const data = await response.json()

    return {
        props: {
            cart: data
        }
    }
}
