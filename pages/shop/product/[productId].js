
import React from "react";
import { useRouter } from "next/router";

const Product = ({product}) => {
    const router = useRouter()
    console.log(router);
  return <div>
    <h1>{product.id}</h1>
    <h1>{product.title}</h1>
  </div>;
};

export default Product;

export async function getServerSideProps(context){
  const {params} = context;
  const {productId} = params
  // fetch all products
  const response = await fetch(`http://localhost:4000/products/${productId}`);
  const data = await response.json();

  return {
    props: {
      product: data
    }
  }
}