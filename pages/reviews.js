import React from "react";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import PageHeading from "../components/PageHeading";

const customerReviews = [
  {
    "id": 1,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers provides isvice that nakalang caterers providevice that nakalang caterers provide unbelievable and extraordinary. you must visit them."
  },
  {
    "id": 2,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers provides is unbelievable and extraordinary. you must visit them."
  },
  {
    "id": 3,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers provides is unbelievable and extraordinary. you must visit them."
  },
  {
    "id": 4,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers prosit them."
  },
  {
    "id": 5,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers provides is unbelievable and extraordinary. you must visit them."
  },
  {
    "id": 6,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers provides is unbelievable and extraordinary. you must visit them."
  },
  {
    "id": 7,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers provides is unbelievable and extraordinary. you must visit them."
  },
  {
    "id": 8,
    "name":"Himanshu Prajapati",
    "email": "himanshu@gmail.com",
    "review": "The service that nakalang caterers provides "
  },
]

const Reviews = () => {
  return <div>
      {/* navbar */}
      <Navbar/>

{/* body */}
<PagePadding>
  <PageHeading>CUSTOMER REVIEWS</PageHeading>
  <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row">
  {/* left add review */}
    <div className=" md:flex-1">
    {/* form */}
      <div className="flex flex-col w-full h-96 py-5 px-5 lg:px-20">
        <h1 className="text-3xl text-center font-bold py-5 text-green-600">ADD REVIEW</h1>
        <div className="space-y-6 flex-col text-gray-700">
        <div className="name w-full">
          <h2 className="text-gray-800">Name : </h2>
          <input type="text" placeholder="eg. aman shukla" className="px-5 py-4 text-xl border-2 w-full border-green-500 rounded-sm"/>
        </div>
        <div className="email">
          <h2 className="text-gray-800">Email Id : </h2>
          <input type="text" placeholder="eg. aman@gmail.com" className="px-5 py-4 text-xl w-full border-2 border-green-500 rounded-sm"/>
        </div>
        <div className="review">
          <h2 className="text-gray-800">Review: </h2>
          <textarea type="text" placeholder="Write your genuine review here." className="px-5 w-full py-4 text-xl border-2 rounded-sm border-green-500"/>
        </div>
        </div>
        <div className="flex justify-center items-center mt-8 ">
          <button className="px-7 py-2 shadow-sm hover:shadow-md rounded-sm shadow-blue-500 text-xl bg-green-600 text-white hover:text-gray-700 hover:bg-green-400">SUBMIT REVIEW</button>
        </div>
      </div>
    </div>
    {/* right show all reviews */}
    <div className="md:flex-1 space-y-10">
      {
        customerReviews.map((review, index)=>(
          <div key={index} className="border-2 w-full shadow-sm shadow-green-500 hover:shadow-md hover:shadow-green-500 cursor-pointer rounded-md px-4 py-3">
            <div className="text-2xl">{review.name} <span className="text-sm">{review.email}</span></div>
            <div className="text-xl">{review.review}</div>
          </div>
        ))
      }
    </div>
  </div>
</PagePadding>
  </div>;
};

export default Reviews;
