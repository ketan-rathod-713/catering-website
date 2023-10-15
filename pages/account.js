import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import PageHeading from './../components/PageHeading';
import authoriseUser from "../utils/authoriseUser"
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import emitToast from "../utils/emitToast";
import User from "../models/User";


const Account = ({user}) => {
  const [userData, setUserData] = useState(user);
  const [editMode, setEditMode] = useState(true);
  

  // const toggleEdit = ()=>{
  //   editMode ? setEditMode(false) : setEditMode(true);
  //   console.log(editMode);
  // }
  
  const handleInputChange = (event, attributeName)=>{
    if(!editMode) return; // do nothing if editmode is off
    setUserData(prev => ({...prev ,[attributeName]: event.target.value}))
}

  const saveAccountHandler = async ()=>{
    console.log(userData);
    const response = await fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user: userData})
        })
    const data = await response.json();
    console.log("data updated successfully");
    emitToast(toast, "Account Updated Successfully")
    console.log(data);
  }

  return <div>
    <Navbar/>
    <PagePadding>
      <PageHeading>YOUR ACCOUNT  
      </PageHeading>
      {/* <div className="flex justify-center">
          <button className="text-white bg-red-400 py-1 px-9" onClick={toggleEdit}>
              {editMode ? "Cancel": "Edit Account"}
          </button>
      </div> */}
      <div>
        <ToastContainer/>
      </div>
      <div>
      {/* name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-1"></div>
        <div className="col-span-1 flex flex-col space-y-5">
          {/* left one */}
          <div className="flex-col flex">
            <label htmlFor="name">Name</label>
            <input contentEditable={"false"} onChange={(e)=>handleInputChange(e, "name")} type="text" value={userData.name} name="name" className="py-3 px-3 border-2 border-orange-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e)=>handleInputChange(e, "email")}  value={userData.email} name="email" className="py-3 px-3 border-2 border-orange-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="phone">Phone</label>
            <input type="text"  onChange={(e)=>handleInputChange(e, "phone")}  value={userData.phone} name="phone" className="py-3 px-3 border-2 border-orange-400"/>
          </div>

          <div className="flex-col flex">
              <label htmlFor="address">Address</label>
              <input value={userData.address} type="text"  onChange={(e)=>handleInputChange(e, "address")}  name="address" className="py-3 px-3 border-2 border-orange-400"/>
            </div>
        </div>
        

        </div>
      </div>

      <div className="flex justify-center mt-20">
        <button className="bg-red-500 text-white py-3 text-center px-7 rounded-sm" onClick={saveAccountHandler}>SAVE ACCOUNT</button>
      </div>
    </PagePadding>
  </div>;
};

export default Account;

export async function getServerSideProps(context){
  const {req} = context;
  const decodedToken = await authoriseUser(req);

  if(decodedToken){
    
    // console.log(decodedToken);
    // get latest information of user from here.
    const user = await User.findOne({email: decodedToken["email"]})
    // console.log(user);
    const serialisedUser = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    }
    console.log(serialisedUser);
    return {
      props: {
        user: serialisedUser
      }
    }
  } else {

  }


  return {
    redirect: {
      destination: "/auth/login",
      permanent: false
    }
  }
}