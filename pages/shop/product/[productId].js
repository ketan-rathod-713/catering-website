
import React from "react";
import { useRouter } from "next/router";
import connectDB from "../../../db/mongooseConnect";
import mongoose from "mongoose";
import Product from "../../../models/Product";

const ProductPage = ({product}) => {
    const router = useRouter()
    
  return <div>
    <h1>{product._id}</h1>
    <h1>{product.title}</h1>
    <h1>{product.description}</h1>
    <h1>{product.price}</h1>
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