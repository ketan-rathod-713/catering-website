import React from "react";
import { useDispatch } from "react-redux";
import { editAdminProductAsync } from "../store/product/productReducer";

export default function ProductEditModal({showModal, setShowModal, productEditData, setProductEditData, handleInputChange}) {
const dispatch = useDispatch()
  
const SaveChanges = ()=> {
  setShowModal(false)
  dispatch(editAdminProductAsync({product: productEditData}))
}

  return (
    <>
      
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-bluepink-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    EDIT PRODUCT
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>


                {/*body*/}
                <div className="relative p-6 flex-col space-y-5">
                <div className="text-xl text-gray-600">
                  PRODUCT ID : {productEditData._id}
                </div>
                <div className="flex-col flex">
                  <label htmlFor="title">Title</label>
                  <input onChange={(e)=>handleInputChange(e, "title")} type="text" value={productEditData.title} name="title" className="py-3 px-3 border-2 border-pink-200"/>
              </div>
                <div className="flex-col flex">
                  <label htmlFor="description">Description</label>
                  <textarea onChange={(e)=>handleInputChange(e, "description")} type="text" value={productEditData.description} name="description" className="py-3 px-3 border-2 border-pink-200"/>
                </div>
                <div className="flex-col flex">
                  <label htmlFor="category">category</label>
                  <input onChange={(e)=>handleInputChange(e, "category")} type="text" value={productEditData.category} name="category" className="py-3 px-3 border-2 border-pink-200"/>
                </div>
                <div className="flex space-x-2">
                <div className="flex-col flex">
                  <label htmlFor="price">price</label>
                  <input onChange={(e)=>handleInputChange(e, "price")} type="text" value={productEditData.price} name="price" className="py-3 px-3 border-2 border-pink-200"/>
                </div>
                <div className="flex-col flex">
                  <label htmlFor="stock">stock</label>
                  <input onChange={(e)=>handleInputChange(e, "stock")} type="text" value={productEditData.stock} name="stock" className="py-3 px-3 border-2 border-pink-200"/>
                </div>
                </div>

                <div className="flex-col flex ">
                  <label htmlFor="status">Product Status</label>
                  <select className="px-5 py-3 border-2 border-pink-200"  value={productEditData.status} onChange={(e) => handleInputChange(e, "status")}>
                    <option value="PUBLISH">PUBLISH</option>
                    <option value="DEACTIVE">DEACTIVE</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-bluepink-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-pink-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SaveChanges()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}