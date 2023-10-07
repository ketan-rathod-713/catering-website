// here all product list will be there and it is shopping page, with pagination and filters
// product page also needs to be there.

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../../components/Navbar";

async function fetchProducts() {
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();
  setProducts(data);
  setLoading(false);
}

const ProductList = ({products}) => {
  useEffect(() => {
    console.log("use effect called");
  }, []);


  const addToCartButtonHandler = (product)=>{
    console.log(product);
  
  }


  return (
    <div>
    {/* navbar */}
    <Navbar/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div className="w-full col-span-1 p-10" key={index}>
            <div className="rounded-md">
              <Link href={`/shop/product/${product.id}`}>
                <div className="">
                  <Image
                    className="w-full h-80 rounded-t-md"
                    src={product.image}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="py-3 px-2">
                  <div>{product.title}</div>
                  <div className="flex justify-between mt-1">
                    <div className="rounded-md bg-blue-800 text-white px-2">
                      {product.category}
                    </div>
                    <div className="font-bold">{product.price}</div>
                  </div>
                </div>
              </Link>
              <div className="mt-2">
                <button className="px-4 py-2 bg-red-700 text-white w-full rounded-md" onClick={()=>addToCartButtonHandler(product)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

export async function getServerSideProps(){
  // fetch all products
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();

  return {
    props: {
      products: data
    }
  }
}
