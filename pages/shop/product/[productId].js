
import React, {useState} from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "react-rating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProductReview from "../../../models/ProductReview";
import User from "../../../models/User";

const ProductPage = ({product, reviews}) => {
    const router = useRouter()
    const [reviewData, setReviewData] = useState({
      reviewText: "",
      rating: 0
    });
    
    const handleReviewTextChange = (e)=>{
      setReviewData(prev => ({...prev, reviewText: e.target.value}))
    }
  
    const createReview = async ()=> {
  
      const response = await fetch(`/api/product/${product._id}/review`, {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const data = await response.json();
      console.log(data)
      if(response.ok){
        emitToast(toast, "Review Created Successfully")
      } else {
        emitToast(toast, data.error || "An Error Occured")
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

  // const reviews = []

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
        <div><Rating initialRating={product?.averageRating} emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'lightgray', width: "30px", height:"30px"}}/>} fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold',width: "30px", height:"30px" }}/>} stop={5} fractions={2} readonly/></div>
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

{/* reviews and ratings */}
    <div>
    <div className="grid grid-cols-5 space-y-10">
  {/* left add review */}
    <div className="col-span-5 lg:col-span-2">
    {/* form */}
      <div className="flex flex-col w-full py-5 px-5 lg:px-20">
        <h1 className="text-3xl text-center font-bold py-5 text-blue-600">ADD REVIEW</h1>
        <div className="space-y-6 flex-col text-gray-700">
        <div>
          {/* <h2 className="text-gray-800">Rating</h2> */}
          <Rating initialRating={reviewData.rating} emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'lightgray', width: "40px", height:"40px"}}/>} fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold',width: "40px", height:"40px" }}/>} stop={5} fractions={2} onChange={(value)=> setReviewData(prev => ({...prev, rating: value}))}/>
        </div>
        <div className="review">
          <h2 className="text-gray-800">Review </h2>
          <textarea onChange={handleReviewTextChange} type="text" placeholder="Write your genuine review here." className="px-5 w-full py-2 text-xl border-2 rounded-sm border-blue-500"/>
        </div>
        </div>
        <div className="flex justify-center items-center mt-8 ">
          <button onClick={createReview} className="px-7 py-2 shadow-sm hover:shadow-md rounded-sm shadow-blue-500 text-xl bg-blue-600 text-white hover:text-gray-700 hover:bg-blue-500 duration-300">SUBMIT REVIEW</button>
        </div>
      </div>
    </div>
    {/* right show all reviews */}
    <div className="col-span-5 lg:col-span-3 space-y-10">
      {
        reviews.map((review, index)=>(
          <div key={index} className="border-2 w-full shadow-sm shadow-blue-500 hover:shadow-md hover:shadow-blue-500 cursor-pointer rounded-md px-4 py-3">
            <div className="text-2xl">{review.user.name} <span className="text-sm">{review.user.email}</span></div>
            <Rating initialRating={review.rating} emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'lightgray', width: "30px", height:"30px"}}/>} fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold',width: "30px", height:"30px" }}/>} stop={5} fractions={2} readonly/>
            <div className="text-xl">{review.reviewText}</div>
          </div>
        ))
      }
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

    // fetch reviews
    const reviews = await ProductReview.find({product: productId}).populate("user")
    const serialised = JSON.stringify(reviews);
    const parsedReviews = JSON.parse(serialised)

  return {
    props: {
      product: data,
      reviews: parsedReviews
    }
  }
}