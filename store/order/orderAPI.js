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
              body: JSON.stringify({products: products, address: address, totalPrice: totalPrice, paymentOption: paymentOption}),
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
  };