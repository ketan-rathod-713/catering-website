import React from "react";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import PageHeading from './../components/PageHeading';

const account = () => {
  return <div>
    <Navbar/>

    <PagePadding>
      <PageHeading>YOUR ACCOUNT</PageHeading>
      <div>
      {/* name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-1 flex flex-col space-y-5">
          {/* left one */}
          <div className="flex-col flex">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" className="py-3 px-3 border-2 border-orange-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="py-3 px-3 border-2 border-orange-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" className="py-3 px-3 border-2 border-orange-400"/>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col space-y-5">
            <div className="flex-col flex">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" className="py-3 px-3 border-2 border-orange-400"/>
            </div>
          </div>
        </div>

        <div className="col-span-1"></div>
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <button className="bg-red-600 text-white py-3 text-center px-7 rounded-sm">SAVE ACCOUNT</button>
      </div>
    </PagePadding>
  </div>;
};

export default account;

// get all account information for given user if valid authorised one
export async function getServerSideProps(){


  return {
    props: 
  }
}