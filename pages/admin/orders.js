import React from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import PageHeading from './../../components/PageHeading';
import PagePadding from './../../components/PagePadding';
import authoriseAdmin from "../../utils/authoriseAdmin";
import Order from './../../models/Order';
import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";

const orders = ({orders}) => {
  return <div>
    <NavbarAdmin/>
   
    <PagePadding>
        <PageHeading>USER ORDERS</PageHeading>
        <div>
        {/* all products */}
            <div className="flex flex-col">
                <div className="grid grid-cols-5 font-bold text-xl pb-2 border-b-2 border-gray-200 px-2">
                    <div>User</div>
                    <div>Products Bought</div>
                    <div>Total Price</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>
               {
                orders.map((order, index) => ( <div key={index} className="grid grid-cols-5 py-2 border-b-2 border-gray-200 hover:bg-gray-200 px-2">
                    <div className="flex flex-col">
                        <div>{order.user.name}</div>
                        <div>{order.user.email}</div>
                    </div>
                    <div>
                        {/* copy code from cart  */}
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

                            <div className="flex space-x-2 lg:space-x-5 items-start">
                                <div className="font text-xl">
                                ₹{product.product.price}
                                </div>
                                <div className="flex justify-center px-3 py-1 border-2 border-gray-400">{product.quantity}</div>
                                <div className=" text-xl">
                                  = {product.product.price * product.quantity}
                                </div>
                                
                            </div>
                        </div>
                        {/* <div className="col-span-1">{cartItem._id}</div> */}
                    </div>))}
          </div>
                    </div>
                    <div className="font-bold text-xl">{order.totalPrice}</div>
                    <div>{order.status}</div>
                    <div className="flex space-x-2 items-start">
                        <button className="px-4 py-1 bg-red-400 text-white">EDIT</button>
                    </div>
                </div>))
               }
                
            </div>
        </div>
    </PagePadding>
  </div>;
};

export default orders;

// backend logic here
export async function getServerSideProps(context){
    const {req} = context;
    const decodedToken = await authoriseAdmin(req);

    // now get all the orders associated
    const orders =await Order.find({}).populate("user"); // get only specific details of user
    console.log(orders)
    const serialised = JSON.stringify(orders)
    const parsed = JSON.parse(serialised)
    return {
        props: {
            orders: parsed
        }
    }
}
