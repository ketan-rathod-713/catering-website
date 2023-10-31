import React, { useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import PagePadding from '../../../components/PagePadding';
import PageHeading from '../../../components/PageHeading';
import emitToast from '../../../utils/emitToast';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotAuthorised from "../../../components/NotAuthorised";

const Product = ({error}) => {
    const [createProduct, setCreateProduct] = useState(true);
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        image: null,
        price: 0,
        category: ""
    });
    const [keyPoints, setKeyPoints] = useState([]);
    const [keyPoint, setKeyPoint] = useState("");
    
    
    const [imagePreview, setImagePreview] = useState("");

    const handleCreateProduct =async ()=>{
        console.log(productData);

        const uploadData = {
          ...productData,
          image: imagePreview,
          keyPoints: keyPoints
        }
        console.log(uploadData);
        const response = await fetch("/api/product", {
            method: "POST",
            body: JSON.stringify(uploadData),
            headers: {
              "Content-Type": "application/json"
            }
        })
        
        if(response.ok){
          setKeyPoints([])
          setProductData({
            title: "",
            description: "",
            image: null,
            price: 0,
            category: ""
          })
          emitToast(toast, "Product Created Successfully")
        } else {
          emitToast(toast, data.error || "An error occured")
        }
        const data = await response.json();
        console.log(data)
        console.log("data updated successfully");
    }

    const handleInputChange = (event, attributeName)=>{
        setProductData(prev => ({...prev ,[attributeName]: event.target.value}))
    }

    const addKeyPoint = ()=>{
      setKeyPoints(prev => ([
        ...prev, keyPoint
      ]))
      setKeyPoint("")
    }

        // Create an event handler to capture the selected image
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0]; // Assuming you are allowing single file selection
        setProductData(prev => ({ ...prev, image: imageFile }));

        // Read the selected image file and set the imagePreview state
        const reader = new FileReader(imageFile);
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(imageFile);
    }
    
    const handleKeyPointsChange = (e, index)=>{
      const newValue = e.target.value;
      const newArr = keyPoints.map((kp, i) => i === index ? newValue : kp)
      setKeyPoints(newArr)
      console.log(keyPoints);
    }

    const deleteKeyPoint = (e, index)=>{
      console.log(index);
      let newArray = [...keyPoints]
      newArray.splice(index, 1)
      setKeyPoints(newArray)
    }

    const handleKeyPointChange = (e)=>{
      setKeyPoint(e.target.value)
    }

    if(error){
      return <div>
          <NotAuthorised message={error}/>
      </div>
  }

  return <div>
    <NavbarAdmin/>
    <ToastContainer/>
    <PagePadding>
        <PageHeading>CREATE PRODUCT</PageHeading>

{/* form */}
<div className="flex flex-col space-y-7 items-center">
        <div>
        {imagePreview && (
                            <div className="flex-col flex">
                                <img src={imagePreview} alt="Product Preview" className="max-w-full" />
                            </div>
                        )}
        </div>
        <div className=" flex flex-col space-y-5 lg:w-1/2">
          {/* left one */}
          <div className="flex-col flex">
            <label htmlFor="title">Title</label>
            <input contentEditable={"false"} onChange={(e)=>handleInputChange(e, "title")} type="text" value={productData.name} name="name" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="description">Description</label>
            <input type="text" onChange={(e)=>handleInputChange(e, "description")}  value={productData.description} name="description" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex">
            <label htmlFor="price">Price</label>
            <input type="number"  onChange={(e)=>handleInputChange(e, "price")}  value={productData.price} name="price" className="py-3 px-3 border-2 border-gray-400"/>
          </div>

          <div className="flex-col flex">
              <label htmlFor="category">Category</label>
              <input value={productData.category} type="text"  onChange={(e)=>handleInputChange(e, "category")}  name="category" className="py-3 px-3 border-2 border-gray-400"/>
            </div>
          <div className="flex-col flex">
              <label htmlFor="image">Product Image</label>
              <input type="file" onChange={handleImageChange}  name="product_image" className="py-3 px-3 border-2 border-gray-400"/>
            </div>

            <div className="flex flex-col">
            <label htmlFor="keyPoint">Add Key Points</label>
            <input type="text" onChange={handleKeyPointChange} value={keyPoint} className="py-3 px-3 border-2 border-gray-400"/>
            <button className="px-7 py-2 bg-blue-600 text-white mt-2 mb-3" onClick={addKeyPoint}>Add</button>

            <div className="keyPoints w-full space-y-1">
              {
                keyPoints.map((point, index)=><div key={index} className="flex justify-between">
                  <input type="text" onChange={(e) => handleKeyPointsChange(e, index)} value={point} name="keyPoint" className=" flex-1 px-3 border-2 border-gray-400"/>
                  <button  onClick={(e) => deleteKeyPoint(e, index)} className="bg-red-700 text-white px-3">Delete</button>
                </div>)
              }
            </div>
          </div>
        </div>
        
        

        <div>
        </div>

        <button className="px-10 py-2 bg-red-600 text-white rounded-sm" onClick={handleCreateProduct}>CREATE PRODUCT</button>
        </div>
    </PagePadding>
  </div>;
};

export default Product;
