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
        discount: 0,
        category: "",
        stock: 0,
        status: "",
        quantityType: "", // kg or pieces or gram
        options: {quantity: [{name: "1 kg", id: "1KG"}], color: [{name: "pink", id: "PINK"}]} // for now focus only on quantity
    });
    const [keyPoints, setKeyPoints] = useState([]);
    const [keyPoint, setKeyPoint] = useState("");
    
    const [quantityOptions, setQuantityOptions] = useState([]);
    const [quantityOptionId, setQuantityOptionId] = useState("");
    const [quantityOptionName, setQuantityOptionName] = useState("");
    
    const [imagePreview, setImagePreview] = useState("");

    const handleCreateProduct =async ()=>{
        console.log(productData);

        const formData = new FormData();

        // Append text fields
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("category", productData.category);
        formData.append("discount", productData.discount);
        formData.append("stock", productData.stock);
        formData.append("status", productData.status);

        // Append the image file
        formData.append("image", productData.image);

        // Append key points as an array
        keyPoints.forEach((point, index) => {
          formData.append(`keyPoints[${index}]`, point);
        });


        const response = await fetch("/api/admin/product/create", {
            method: "POST",
            body: formData
        })
        
        if(response.ok){
          setKeyPoints([])
          setProductData({
            title: "",
            description: "",
            image: null,
            price: 0,
            discount: 0,
            category: "",
            stock: 0,
            status: "",
            quantityType: ""
          })
          setImagePreview("")
          setKeyPoints([])
          emitToast(toast, "Product Created Successfully")
        } else {
          console.log(response);
          const data = await response.json();
          emitToast(toast, data.error || "An error occured")
        }
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

    const addQuantityOption = ()=>{
      setQuantityOptions(prev => ([
        ...prev, {
          id: quantityOptionId,
          name: quantityOptionName
        }
      ]))
      setQuantityOptionId("")
      setQuantityOptionName("")
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
    
    const handleQuantityOptionsChange = (e,type ,index)=>{
      if(type === "NAME"){
        const newValue = e.target.value;
        const newArr = quantityOptions.map((qo, i) => i === index ? {...qo, name: newValue} : qo)
        setQuantityOptions(newArr)
      } else { // ID
        const newValue = e.target.value;
        const newArr = quantityOptions.map((qo, i) => i === index ? {...qo, id: newValue} : qo)
        setQuantityOptions(newArr)
      }
    }

    const deleteQuantityOption = (e, index)=>{
      let newArray = [...quantityOptions]
      newArray.splice(index, 1)
      setQuantityOptions(newArray)
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

    const handleQuantityOptionIdChange = (e)=>{
      setQuantityOptionId(e.target.value)
    }

    const handleQuantityOptionNameChange = (e)=>{
      setQuantityOptionName(e.target.value)
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
<div className="flex flex-col space-y-7">
        <div>
        {imagePreview && (
                            <div className="flex-col flex">
                                <img src={imagePreview} alt="Product Preview" className="max-w-full" />
                            </div>
                        )}
        </div>
        <div className=" space-y-1 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* left one */}
          <div className="flex-col flex lg:col-span-3">
            <label htmlFor="title">Title</label>
            <input contentEditable={"false"} onChange={(e)=>handleInputChange(e, "title")} type="text" value={productData.name} name="name" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex lg:col-span-3">
            <label htmlFor="description">Description</label>
            <input type="text" onChange={(e)=>handleInputChange(e, "description")}  value={productData.description} name="description" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex col-span-1">
            <label htmlFor="price">Price</label>
            <input type="number"  onChange={(e)=>handleInputChange(e, "price")}  value={productData.price} name="price" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex col-span-1">
            <label htmlFor="discount">Discount</label>
            <input type="number"  onChange={(e)=>handleInputChange(e, "discount")}  value={productData.discount} name="discount" className="py-3 px-3 border-2 border-gray-400"/>
          </div>
          <div className="flex-col flex col-span-1">
            <label htmlFor="stock">stock</label>
            <input type="number"  onChange={(e)=>handleInputChange(e, "stock")}  value={productData.stock} name="stock" className="py-3 px-3 border-2 border-gray-400"/>
          </div>

          <div className="flex-col flex">
              <label htmlFor="category">Category</label>
              <input value={productData.category} type="text"  onChange={(e)=>handleInputChange(e, "category")}  name="category" className="py-3 px-3 border-2 border-gray-400"/>
            </div>
          <div className="flex-col flex">
              <label htmlFor="image">Product Image</label>
              <input type="file" onChange={handleImageChange}  name="product_image" className="py-3 px-3 border-2 border-gray-400"/>
            </div>

            <div className="flex-col flex ">
                  <label htmlFor="quantityType">Quantity Type</label>
                  <select className="px-5 py-3 border-2 border-gray-200"  value={productData.quantityType} onChange={(e) => handleInputChange(e, "quantityType")}>
                    <option value="PIECES">PIECES</option>
                    <option value="QUANTITATIVE">QUANTITATIVE</option>
                  </select>
                </div>

            <div className="flex-col flex ">
                  <label htmlFor="status">Status</label>
                  <select className="px-5 py-3 border-2 border-gray-200"  value={productData.status} onChange={(e) => handleInputChange(e, "status")}>
                    <option value="PUBLISH">PUBLISH</option>
                    <option value="DEACTIVE">DEACTIVE</option>
                  </select>
                </div>

                {/* <div className="flex flex-col">
            <label htmlFor="keyPoint">Add Quantity Options</label>
            <div className="grid grid-cols-2 space-x-2">
              <input type="text" placeholder="ID" onChange={handleQuantityOptionIdChange} value={quantityOptionId} className="py-3 px-3 border-2 border-gray-400"/>
              <input type="text" placeholder="NAME" onChange={handleQuantityOptionNameChange} value={quantityOptionName} className="py-3 px-3 border-2 border-gray-400"/>
            </div>
            <button className="px-7 py-2 bg-blue-600 text-white mt-2 mb-3" onClick={addQuantityOption}>Add</button>

            <div className="keyPoints space-y-1 col-span-1">
              {
                quantityOptions.map((point, index)=><div key={index} className="grid grid-cols-5">
                  <input type="text" onChange={(e) => handleQuantityOptionsChange(e, "ID",index)} value={point.id} name="keyPoint" className="px-3 border-2 col-span-2 border-gray-400"/>
                  <input type="text" onChange={(e) => handleQuantityOptionsChange(e,"NAME" ,index)} value={point.name} name="keyPoint" className="px-3 border-2 col-span-2 border-gray-400"/>
                  <button  onClick={(e) => deleteQuantityOption(e, index)} className="bg-red-700 text-white px-3 col-span-1">Delete</button>
                </div>)
              }
            </div>
          </div> */}

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
