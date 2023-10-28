import React, { useState } from "react";
import PagePadding from './../../components/PagePadding';
import PageHeading from './../../components/PageHeading';
import Navbar from './../../components/Navbar';
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import emitToast from './../../utils/emitToast';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "", 
        error: ""
    });

    const handleInputChange = (event, attributeName)=>{
        console.log(event.target.value, attributeName);
        setFormData(prev => ({...prev ,[attributeName]: event.target.value}))
    }

    const handleSignupClick = async ()=>{
        console.log(formData);
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: formData.email, password: formData.password})
        })
        console.log(response);
        const data = await response.json()
        console.log(data);
        const token = data["token"];
        if(token){
            Cookies.set("token", token)
            router.push("/")
        } else {
            emitToast(toast, data.error)
            const errorMessage = data["message"] || "An error occured"
            setFormData(prev => ({...prev, error: errorMessage }))
        }
    }
    
  return <div className="">
        <Navbar/>
        <ToastContainer/>
        <PagePadding>
            <PageHeading>LOGIN</PageHeading>
            <div className="outerBox py-2 flex flex-col justify-center items-center">
                <div className="innerBox w-full lg:w-1/2 flex flex-col items-center space-y-6">
                    <div className="w-full">
                        <div htmlFor="email">Email</div>
                        <input type="text"  value={formData.email} onChange={(e) => handleInputChange(e, "email")} className="py-3 px-5 text-lg w-full border-gray-300 border-2"/>
                    </div>
                    <div className="w-full">
                        <div htmlFor="password">Password</div>
                        <input type="password" value={formData.password} onChange={(e) => handleInputChange(e, "password")} className="py-3 px-5 text-lg w-full border-gray-300 border-2"/>
                    </div>
                    <div className="flex justify-center py-5">
                        <button onClick={handleSignupClick} className="px-10 text-lg text-white rounded-sm py-3 bg-blue-600">LOGIN</button>
                    </div>

                    <div className="w-full">
                        <div className="py-2 px-4 text-center bg-white text-black text-xl border-2 border-gray-400">Login with google</div>
                    </div>
                 </div>
            </div>
            
        </PagePadding>
  </div>;
};

export default LoginPage;
