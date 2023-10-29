import React from "react";
import PagePadding from "../components/PagePadding";
import PageHeading from './../components/PageHeading';
import Navbar from "../components/Navbar";

const contactus = () => {
  return <div>
  <Navbar/>
    <PagePadding>
        <PageHeading>Contact us</PageHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          wow
        </div>
        <div className="space-y-5">
            <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input type="text" className="py-2 px-7 border-2 border-gray-400"/>
          </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input type="email" className="py-2 px-7 border-2 border-gray-400"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <input type="number" className="py-2 px-7 border-2 border-gray-400"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="query">Write Something About Your Event</label>
              <textarea type="text" className="py-2 px-7 border-2 border-gray-400"/>
            </div>

            <div className="flex justify-center">
              <button className="bg-blue-600 text-white py-2 px-7 rounded-sm">Submit</button>
            </div>
        </div>


    </div>
    </PagePadding>

    
  </div>;
};

export default contactus;
