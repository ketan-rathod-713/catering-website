import React, {useEffect, useState} from "react";
import authoriseAdmin from "../../../utils/authoriseAdmin";
import Product from "../../../models/Product";
import NavbarAdmin from "../../../components/NavbarAdmin";
import PagePadding from "../../../components/PagePadding";
import PageHeading from "../../../components/PageHeading";
import ProductEditModal from "../../../components/ProductEditModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdminProductsAsync, loading,selectAdminProducts, error, setAllAdminProductsFromServerSide } from "../../../store/product/productReducer";
import Link from "next/link";


const ProductsList = ({products, error}) => {
    const [editIndex, setEditIndex] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const Products = useSelector(selectAdminProducts);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setAllAdminProductsFromServerSide(products))
    }, [])

    const [productEditData, setProductEditData] = useState(null);

    const handleInputChange = (event, attributeName)=>{
        setProductEditData(prev => ({...prev ,[attributeName]: event.target.value}))
    }
    
    const handleEditClick = (index, product)=>{
        console.log("edit ", index, product)
        setEditIndex(index) // let us edit it // go to second page for editi
        setProductEditData(Products[index])
        setshowModal(true)
    }

    if(error){
        return <div>
            {error}
        </div>
    }
    
  return <div>
  {/* product list */}
   <NavbarAdmin/>
   <PagePadding>
    <PageHeading>Products</PageHeading>
    <div>
        <ProductEditModal productEditData={productEditData} setProductEditData={setProductEditData} handleInputChange={handleInputChange} showModal={showModal} setShowModal={setshowModal}/>
    </div>
    <div className="my-10 flex justify-end">
        <Link href="/admin/product/create"  className="px-10 py-3 bg-purple-900 rounded-md active:animate-pulse duration-200 active:bg-purple-700 text-gray-200 font-bold">CREATE PRODUCT</Link>
    </div>
    <div className="space-y-10 border-2 border-gray-200 shadow-md">
    <div className="hidden lg:visible p-5 lg:grid grid-cols-10 text-xl font-bold bg-purple-600  text-gray-200">
                    <div className="col-span-4">PRODUCT</div>
                    <div className="col-span-1">CATEGORY</div>
                    <div className="col-span-1">STOCK</div>
                    <div className="col-span-1">PRICE</div>
                    <div className="col-span-1">STATUS</div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1">OPTIONS</div> 
                </div>
        {
            Products.map((product, index)=> (
                <div key={index} className="p-2 grid grid-rows-6 lg:grid-rows-none lg:grid-cols-10">
                    <div className="lg:col-span-4">
                        <div className="flex flex-col space-y-1">
                            <div className="font-bold text-gray-600">
                                 {product.title}
                            </div>
                            <div className=" text-gray-500 text-sm">
                            PRODUCT ID : {product._id}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 text-gray-600 font-bold">{product.category}</div>
                    <div className="lg:col-span-1 text-gray-600 font-bold">{product.stock}</div>
                    <div className="lg;col-span-1 text-gray-600 font-bold">{product.price}</div>
                    <div className="lg:col-span-1 text-gray-600 font-bold">{product.status}</div>
                    <div className="lg:col-span-1"></div>
                    <div className="lg:col-span-1">
                    <button
                        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e)=>handleEditClick(index, product)}
                    >
                        EDIT
                    </button>
                    </div> 
                </div>
            ))
        }
    </div>
   </PagePadding>
  </div>;
};

export default ProductsList;

export async function getServerSideProps(context){
    const {req} = context;
    const decodedToken = await authoriseAdmin(req);

    if(decodedToken){
        const products = await Product.find({});
        
        const serialised = JSON.stringify(products)
        const parsed = JSON.parse(serialised)

        console.log(parsed);
        return {
            props: {
                products: parsed
            }
        }
    } else {
        return {
            props: {
                error: "You are not authorised to view this page"
            }
        }
    }
}
