import React, {useState} from "react";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import PageHeading from "../components/PageHeading";
import Rating from "react-rating";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emitToast from './../utils/emitToast';
import { ToastContainer, toast } from "react-toastify";
import Review from "../models/Review";
import connectDB from "../utils/mongooseConnect";
import 'react-toastify/dist/ReactToastify.css';

const Reviews = ({reviews, error}) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    reviewText: ""
  });

  console.log(reviews, error)

  const handleReviewTextChange = (e)=>{
    setReviewData(prev => ({...prev, reviewText: e.target.value}))
  }

  const createReview = async ()=> {

    const response = await fetch("/api/review", {
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
  
  return <div>
      {/* navbar */}
      <Navbar/>
<ToastContainer/>
{/* body */}
<PagePadding>
  <PageHeading>CUSTOMER REVIEWS</PageHeading>
  <div className="grid grid-cols-5 space-y-10">
  {/* left add review */}
    <div className="col-span-5 lg:col-span-2">
    {/* form */}
      <div className="flex flex-col w-full py-5 px-5 lg:px-20">
        <h1 className="text-3xl text-center font-bold py-5 text-green-600">ADD REVIEW</h1>
        <div className="space-y-6 flex-col text-gray-700">
        <div>
          <h2 className="text-gray-800">Rating</h2>
          <Rating initialRating={reviewData.rating} emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'lightgray', width: "40px", height:"40px"}}/>} fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold',width: "40px", height:"40px" }}/>} stop={5} fractions={2} onChange={(value)=> setReviewData(prev => ({...prev, rating: value}))}/>
        </div>
        <div className="review">
          <h2 className="text-gray-800">Review </h2>
          <textarea onChange={handleReviewTextChange} type="text" placeholder="Write your genuine review here." className="px-5 w-full py-2 text-xl border-2 rounded-sm border-green-500"/>
        </div>
        </div>
        <div className="flex justify-center items-center mt-8 ">
          <button onClick={createReview} className="px-7 py-2 shadow-sm hover:shadow-md rounded-sm shadow-blue-500 text-xl bg-green-600 text-white hover:text-gray-700 hover:bg-green-500 duration-300">SUBMIT REVIEW</button>
        </div>
      </div>
    </div>
    {/* right show all reviews */}
    <div className="col-span-5 lg:col-span-3 space-y-10">
      {
        reviews.map((review, index)=>(
          <div key={index} className="border-2 w-full shadow-sm shadow-green-500 hover:shadow-md hover:shadow-green-500 cursor-pointer rounded-md px-4 py-3">
            <div className="text-2xl">{review.user.name} <span className="text-sm">{review.user.email}</span></div>
            <Rating initialRating={review.rating} emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'lightgray', width: "30px", height:"30px"}}/>} fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold',width: "30px", height:"30px" }}/>} stop={5} fractions={2} readonly/>
            <div className="text-xl">{review.reviewText}</div>
          </div>
        ))
      }
    </div>
  </div>
</PagePadding>
  </div>;
};

export default Reviews;

export async function getServerSideProps(context){
  try {
      await connectDB();
      const reviews = await Review.find({}).populate({
        path: 'user',
        select: 'name email', // Specify the fields you want to retrieve
      })
      .exec();
      
      console.log(reviews)
      const serialised = JSON.stringify(reviews)
      const parsed = JSON.parse(serialised)

      return {
        props: {
          reviews: parsed
        }
      }
    } catch (error) {
      console.log(error)

      return {
        props: {
          reviews: [],
          error: error
        }
      }
    }
}