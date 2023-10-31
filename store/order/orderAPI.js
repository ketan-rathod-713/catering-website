import { CREATE_NEW_ORDER } from "../../data/orderPostTypes";

export const fetchAllOrdersAdmin = () => { // fetch all orders for admin
    return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch("/api/order");
          const data = await response.json()
  
          resolve(data)
      } catch(error){
          reject({error})
      }
    });
  };
  

export const createNewOrder = ({products, address, totalPrice, paymentOption}) => {
    return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch("/api/order", {
              method: "POST",
              body: JSON.stringify({products: products, address: address, totalPrice: totalPrice, paymentOption: paymentOption, type: CREATE_NEW_ORDER}),
              headers:  {
                  "Content-Type": "application/json"
              }
          })
          const data = await response.json()
          console.log(data)
          resolve(data)
      } catch(error){
          reject({error})
      }
    });
  }

export const deliverOrder = ({orderId}) => {
    return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch("/api/order", {
              method: "POST",
              body: JSON.stringify({orderId, type: "DELIVER_ORDER"}),
              headers:  {
                  "Content-Type": "application/json"
              }
          })
          const data = await response.json()
          resolve(orderId)
      } catch(error){
          reject({error})
      }
    });
  };