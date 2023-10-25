import React from "react";
import authoriseUser from "../../../utils/authoriseUser";
import CircularJSON from "circular-json";
import Order from "../../../models/Order"
import PagePadding from "../../../components/PagePadding";
import PageHeading from "../../../components/PageHeading";
import Link from "next/link";
import Image from "next/image";

const OrdersList = ({orders}) => {
  
  return <div>
    <PagePadding>
      <PageHeading> Your Orders</PageHeading>
      <div className="flex flex-col space-y-7">
        {orders.map((order, index)=>(<div key={index}>
        <Link href={`/shop/order/${order._id}`}>
          <div className="text-lg">OrderId: {order._id}</div>
          <div className="text-lg font-bold">Status : {order.status}</div>
          <div className="mt-2 space-y-2">
            {order.products.map((product, index)=>(<div key={index} className="grid grid-cols-6 gap-4 lg:gap-6">
                        <div className="col-span-2 md:col-span-1 lg:px-5">
                            <Image width={1000} height={1000} src="/intro.jpg" className="w-full aspect-square rounded-sm shadow-sm"/>
      
                        </div>
                        <div className="col-span-4 lg:col-span-5 flex flex-col space-y-2">
                            <Link className="text-xl hover:text-blue-500 duration-300" href={`/shop/product/${product.product._id}`}>{product["product"]["title"]}</Link>
                            <div className="text-md text-gray-500">{product.product.category}</div>
                            <div className="text-md text-gray-500">
                                TODO: Rating Here
                            </div>

                            <div className="flex space-x-2 lg:space-x-5">
                                <div className="font-bold text-xl">
                                ₹{product.product.price}
                                </div>
                                <div className="flex justify-center px-7 py-1 border-2 border-gray-400">{product.quantity}</div>
                                <div className="font-bold text-xl">
                                  = {product.product.price * product.quantity}
                                </div>
                                
                            </div>
                        </div>
                        {/* <div className="col-span-1">{cartItem._id}</div> */}
                    </div>))}
          </div>

          <div className="mt-3 font-bold text-lg">
            Total Price : {order.totalPrice}
          </div>
        </Link>
        </div>))}
      </div>
    </PagePadding>
  </div>;
};

export default OrdersList;

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
    const orders = await Order.find({user: decodedToken["_id"]}).exec()
    
    const ordersSerialized = JSON.stringify(
      orders.map((order) => ({
        _id: order._id.toString(),
        user: {
          _id: order.user._id.toString(),
        },
        ...order._doc
      }))
    );

    const parsed = JSON.parse(ordersSerialized)

    return {
      props: {
        orders: parsed
      }
    }
}
