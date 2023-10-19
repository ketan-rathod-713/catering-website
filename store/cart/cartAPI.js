import { EDIT_QUANTITY, REMOVE_PRODUCT } from "../../data/actionTypes";

export const fetchCartData = () => {
  return new Promise(async (resolve, reject) => {
    try {
        const response = await fetch("/api/cart");
        const data = await response.json()

        resolve(data)
    } catch(error){
        reject({error})
    }
  });
};

export const deleteCartProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
        const response = await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({product: product, type: REMOVE_PRODUCT}),
            headers:  {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        resolve({data: data.cart, deletedProduct: product})
    } catch(error){
        reject({error})
    }
  });
};

export const editQuantityCartProduct = ({product, quantity}) => {
  return new Promise(async (resolve, reject) => {
    try {
        console.log(product)
        console.log(quantity)
        const response = await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({product: product, type: EDIT_QUANTITY, quantity: quantity}),
            headers:  {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        resolve({data: data.cart, editedProduct: product, newQuantity: +quantity })
    } catch(error){
        reject({error})
    }
  });
};