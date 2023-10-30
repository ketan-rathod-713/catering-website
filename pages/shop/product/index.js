// here all product list will be there and it is shopping page, with pagination and filters
// product page also needs to be there.

import Link from "next/link";
import React, {useEffect, useState, Suspense} from "react";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import connectDB from "../../../utils/mongooseConnect";
import Product from "../../../models/Product";
import PagePadding from './../../../components/PagePadding';
import PageHeading from './../../../components/PageHeading';
import {motion} from "framer-motion";
import Footer from "../../../components/Footer";
import { ADD_PRODUCT } from "../../../data/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS as well.
import emitToast from './../../../utils/emitToast';
import Pagination from "../../../components/Pagination";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { POPULAR_HIGH_FIRST, PRICE_HIGH_FIRST, PRICE_LOW_FIRST, RATING_HIGH_FIRST, RATING_LOW_FIRST, TIME_NEWEST_FIRST } from "../../../data/sortProductTypes";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const filters = [
    {
        sectionName: "Colors",
        items: [
            {
                name: "White",
                value: "white"
            },
            {
                name: "Black",
                value: "white"
            },
            {
                name: "Blue",
                value: "white"
            },
            {
                name: "Green",
                value: "white"
            }, {
                name: "Yellow",
                value: "white"
            }, {
                name: "Orange",
                value: "white"
            }, {
                name: "Red",
                value: "white"
            },
        ]
    }, {
        sectionName: "Size",
        items: [
            {
                name: "XL",
                value: "white"
            },
            {
                name: "L",
                value: "white"
            },
            {
                name: "XXL",
                value: "white"
            },
            {
                name: "XXXL",
                value: "white"
            }, {
                name: "SM",
                value: "white"
            },
        ]
    }
]

const categories = [
    {
        name: "Sweet",
        value: "sweet"
    }, {
        name: "Farsan",
        value: "farsan"
    }, {
        name: "Product",
        value: "product"
    },
]

const dropdownSort = [
    {
        name: "Most Popular",
        value: POPULAR_HIGH_FIRST
    },
    {
        name: "Best Rating",
        value: RATING_HIGH_FIRST
    },
    {
        name: "Lowest Rating",
        value: RATING_LOW_FIRST
    },
    {
        name: "Price: Low to High",
        value: PRICE_LOW_FIRST
    }, {
        name: "Price: High to Low",
        value: PRICE_HIGH_FIRST
    },
]

const ProductList = ({products, limit, totalDocs}) => {
    const [Products, setProducts] = useState(products);
    const [openSortDropdown, setOpenSortDropdown] = useState(false);
    const [filtersOpen, setfiltersOpen] = useState({});
    const [sortType, setsortType] = useState(null);
    const [page, setPage] = useState(1);
    
    const router = useRouter();

    const pageChangeHandler =async (newPage)=> {
        if(newPage != page){
            setPage(newPage)
            // fetch items
            const response = await fetch(`/api/product?page=${newPage}&limit=${limit}&sort=${sortType}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET"
            }) 

            const products = await response.json();

            setProducts(products)

            console.log(products)
        }
    }
    
    const handleSortClicked = async ( newSortType ) => {
        if(sortType != newSortType){
            setsortType(newSortType)
            // fetch items
            const response = await fetch(`/api/product?page=${page}&limit=${limit}&sort=${newSortType}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET"
            }) 

            const products = await response.json();

            setProducts(products)

            console.log(products)
        }
    }
    
    useEffect(() => {
        console.log("use effect called");

        const filterObject = {};
        // Iterate through the filters array and set each sectionName as a key with a value of false
        filters.forEach((filter) => {
          filterObject[filter.sectionName] = false;
        });
        setfiltersOpen(filterObject);

    }, []);

    const toggleFilterSectionDropdown = (sectionName)=>{
      console.log(sectionName);
      console.log(filtersOpen);
      if(filtersOpen[sectionName]){
        setfiltersOpen((prev)=>({...prev, [sectionName]: false}))
      } else {
        setfiltersOpen((prev)=>({...prev, [sectionName]: true}))
      }
    }

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

    const toggleSortDropdown = () => {
        if (openSortDropdown) {
            setOpenSortDropdown(false)
        } else {
            setOpenSortDropdown(true)
        }
    }


    return (
        <div> {/* navbar */}
            <Navbar/>

            <PagePadding>
                <PageHeading>Products</PageHeading>
               
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    />
          
                <div className="flex justify-between mb-8">
                    <div> {/* NEW ARRIVALS */} </div>
                    <div className="relative">
                        <div className="text-xl px-4 flex space-x-2 items-center text-gray-700 hover:text-gray-900 cursor-pointer z-0"
                            onClick={toggleSortDropdown}>
                            <div>Sort</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </div>
                        {
                        openSortDropdown && <div className="absolute top-10 right-10 bg-white w-52 p-3 space-y-1 rounded-sm z-0">
                            { 
                            dropdownSort.map((item, index) => (
                                <div key={index} onClick={(e)=> handleSortClicked(item.value)}
                                    className="text-lg hover:shadow-md hover:shadow-gray-500 p-1 rounded-md cursor-pointer">
                                    {
                                    item.name
                                } </div>
                            ))
                        } </div>
                    } </div>

                </div>
                <div className="grid gap-10 grid-cols-1 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        {/* filter component here */}
                        <div className="flex flex-col">

                            {/* one subsection */}
                            {
                            filters.map((section, index) => (
                                <div key={index}
                                    className="flex flex-col py-5 border-b-2 border-gray-300">
                                    <div className="text-lg flex justify-between py-4">
                                        <div>{
                                            section.sectionName
                                        }</div>
                                        <div className="text-3xl cursor-pointer" onClick={() => toggleFilterSectionDropdown(section.sectionName)}>
                                          {
                                            filtersOpen[section.sectionName] ? "-" : "+"
                                          }
                                        </div>
                                    </div>

                                    <motion.div key={filtersOpen[section.sectionName]} intial={{}} animate={{}} transition={{duration: 3}} className="options flex flex-col space-y-4">
                                        {/* all subsection items */}

                                        { filtersOpen[`${section.sectionName}`] &&
                                        section.items.map((item, index) => (
                                            <motion.div initial={{x: -100}} animate={{x: 0}} transition={{duration: index/5}} key={index}
                                                className="flex space-x-5 items-center">
                                                <input className="h-4 w-4" type="checkbox"/>
                                                <div>{
                                                    item.name
                                                }</div>
                                            </motion.div>
                                        ))
                                    } </motion.div>
                                </div>
                            ))
                        } </div>
                    </div>

                    <Suspense fallback={<h1>Loading..</h1>}>
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-20">
                        {
                        Products.map((product, index) => (
                            <div className="w-full col-span-1"
                                key={index}>
                                <div className="rounded-md">
                                    <Link href={
                                        `/shop/product/${
                                            product._id
                                        }`
                                    }>
                                        <div className="">
                                            <Image className="w-full h-80 rounded-t-md"
                                                src={
                                                    product.image
                                                }
                                                alt=""
                                                width={100}
                                                height={100}/>
                                        </div>
                                        <div className="py-3 px-2">
                                            <div>
                                                <div>
                                                    {product.title}
                                                </div>
                                                <div className="flex space-x-3">
                                                <Rating initialRating={product?.averageRating} emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'lightgray', width: "15px", height:"15px"}}/>} fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold',width: "15px", height:"15px" }}/>} stop={5} fractions={2} readonly/>
                                                <div>{product.averageRating}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <div className="rounded-md bg-blue-800 text-white px-2">
                                                    {
                                                    product.category
                                                } </div>
                                                <div className="font-bold">
                                                    {
                                                    product.price
                                                }</div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="mt-2">
                                        <button className="px-4 py-2 bg-red-600 text-white w-full rounded-b-md active:bg-red-900"
                                            onClick={
                                                () => addToCartButtonHandler(product)
                                        }>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                        <div className="flex justify-start lg:col-span-3 mt-10">
                        <Pagination page={page} totalPages={Math.ceil(totalDocs/limit)} pageChangeHandler={pageChangeHandler}/>
                        </div>
                     </div>
                    </Suspense>
                </div>

               
            </PagePadding>

            <Footer/>
        </div>
    );
};

export default ProductList;

export async function getServerSideProps() {
    
    // here define page and limit
    const page = 1;
    const limit = 5;
    const skip = 0;

    await connectDB()
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit)
    const products = await Product.find().skip(skip).limit(limit).lean()
    const serializedProducts = products.map((product) => {
        return {
            ...product,
            _id: product._id.toString(), // Convert _id to a string
        };
    });
    return {
        props: {
            products: serializedProducts,
            totalDocs,
            limit
        }
    }
}
