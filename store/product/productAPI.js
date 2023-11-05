import { EDIT_PRODUCT } from "../../data/adminProductActions";
import { CREATE_NEW_ORDER } from "../../data/orderPostTypes";

export const fetchAllAdminProducts = () => { // fetch all orders for admin
    return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch("/api/admin/product");
          const data = await response.json()
  
          resolve(data)
      } catch(error){
          reject({error})
      }
    });
  };
  

  export const editAdminProduct = ({product}) => {
    return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch("/api/admin/product", {
              method: "POST",
              body: JSON.stringify({product, type: EDIT_PRODUCT}),
              headers:  {
                  "Content-Type": "application/json"
              }
          })
          const data = await response.json()
          resolve(data)
      } catch(error){
          reject(error)
      }
    });
  };