
import React from "react";
import { useRouter } from "next/router";
import connectDB from "../../../utils/mongooseConnect";
import mongoose from "mongoose";
import Product from "../../../models/Product";
import PagePadding from './../../../components/PagePadding';
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Cookies from "js-cookie";
import { ADD_PRODUCT } from "../../../data/actionTypes";
import emitToast from "../../../utils/emitToast";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = ({product}) => {
    const router = useRouter()
    
    const addToCartButtonHandler = async (product) => {
      console.log(product);
      
      const token = Cookies.get("token")
      if(!token){
          router.push("/auth/login")
      } else {
          const response = await fetch("/api/cart", {
              method: "POST",
              body: JSON.stringify({product: product, type: ADD_PRODUCT}),
              headers:  {
                  "Content-Type": "application/json"
              }
          })
  
          if(response.ok){
              emitToast(toast, "Product Added To Cart")
          } else {
              emitToast(toast, "An Error Occured")
          }
          console.log(response)
      }
  }
  return <div>
  <Navbar/>
  <ToastContainer/>
   <PagePadding>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 relative z-0">
        {/* <div className="absolute left-0 top-1/2 text-black p-2 rounded-r-md bg-white cursor-pointer">L</div>
        <div className="absolute right-0 top-1/2 text-black p-2 rounded-l-md bg-white bg-orange-300 cursor-pointer">R</div> */}
        <Image width={1300} height={1300} className="object-contain border-2" src={product.image}/>
      </div>
      <div className="lg:col-span-1 text-center flex-col space-y-7">
      {/* all items */}
        <div className="text-3xl font-bold">{product.title}</div>
        <div className="flex-col">
          <div className="text-3xl">RS {product.price}</div>
          <div className="text-gray-700">Price inclusive of all taxes</div>
          {/* <div>Offers Here</div> */}
        </div>
        <div>
          {/* filters here */}
        </div>
        {/* buttons */}
        <div className="flex-col space-y-5">
          <div onClick={(e) => addToCartButtonHandler(product)} className="flex space-x-3 py-2 items-center justify-center bg-blue-700 text-white hover:bg-blue-600 cursor-pointer">
            <div>
              {/* icon */}
            </div>
            <div>
              ADD TO CART
            </div>
          </div>
          

          <div className="flex space-x-3 py-2 items-center justify-center border-2 border-blue-700 text-gray-800 hover:bg-blue-100 cursor-pointer">
            <div>
              {/* icon */}
            </div>
            <div>
              ADD TO WISHLIST
            </div>
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-xl font-bold text-blue-700">Product Details</h1>
          <div>
            {product.description}
          </div>
        </div>

        <div className="text-left">
          <h1 className="text-xl font-bold text-blue-700">Key Points</h1>
          <div>
            {product.keyPoints.map((keyPoint, index) => (
              <div key={index} className="flex space-x-3">
                <div> - </div>
                <div> {keyPoint}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
   </PagePadding>
  </div>;
};

export default ProductPage;

export async function getServerSideProps(context){
  const {params} = context;
  const {productId} = params
  // fetch all products
    await connectDB()
    const product = await Product.findById(productId).lean();
    console.log(product);

    const data = {...product, _id: product["_id"].toString()};

    // const data =  {
    //   id: 1,
    //   title: "wow",
    //   description: "great",
    //   price: 100
    // }
  return {
    props: {
      product: data
    }
  }
}