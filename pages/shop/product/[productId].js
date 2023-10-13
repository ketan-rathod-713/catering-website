
import React from "react";
import { useRouter } from "next/router";
import connectDB from "../../../utils/mongooseConnect";
import mongoose from "mongoose";
import Product from "../../../models/Product";
import PagePadding from './../../../components/PagePadding';
import Image from "next/image";
import Navbar from "../../../components/Navbar";

const ProductPage = ({product}) => {
    const router = useRouter()
    
  return <div>
  <Navbar/>
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
          <div className="flex space-x-3 py-2 items-center justify-center bg-yellow-700 text-white hover:bg-yellow-600">
            <div>
              {/* icon */}
            </div>
            <div>
              ADD TO BAG
            </div>
          </div>
          

          <div className="flex space-x-3 py-2 items-center justify-center border-2 border-yellow-700 text-gray-800 hover:bg-yellow-100">
            <div>
              {/* icon */}
            </div>
            <div>
              ADD TO WISHLIST
            </div>
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-xl font-bold">Product Details</h1>
          <div>
            {product.description}
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