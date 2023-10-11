import React, { useState } from "react";
import PagePadding from './../../components/PagePadding';
import PageHeading from './../../components/PageHeading';
import Navbar from './../../components/Navbar';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    
  return <div className="">
        <Navbar/>
        <PagePadding>
            <PageHeading>SIGN UP</PageHeading>
            <div className="outerBox py-2 flex flex-col justify-center items-center">
                <div className="innerBox w-full lg:w-1/2 flex flex-col items-center space-y-6">
                    <div className="w-full">
                        <div htmlFor="name">Name</div>
                        <input type="text" className="py-3 px-5 text-lg w-full border-blue-300 border-2"/>
                    </div>
                    <div className="w-full">
                        <div htmlFor="email">Email Id</div>
                        <input type="email" className="py-3 px-5 text-lg w-full border-blue-300 border-2"/>
                    </div>
                    <div className="w-full">
                        <div htmlFor="phone">Phone</div>
                        <input type="tel" className="py-3 px-5 text-lg w-full border-blue-300 border-2"/>
                    </div>
                    <div className="w-full">
                        <div htmlFor="password">Password</div>
                        <input type="password" className="py-3 px-5 text-lg w-full border-blue-300 border-2"/>
                    </div>
                    <div className="flex justify-center py-5">
                        <button className="px-10 text-lg text-white rounded-sm py-3 bg-blue-500">SIGN UP</button>
                    </div>
                 </div>
            </div>
        </PagePadding>
  </div>;
};

export default SignupPage;
