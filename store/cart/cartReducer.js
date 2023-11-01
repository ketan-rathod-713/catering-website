import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCartProduct, editQuantityCartProduct, editQunatityCartProduct, fetchCartData, resetCartProducts } from "./cartAPI";

// async actions
export const fetchCartDataAsync = createAsyncThunk("cart/fetchCartData", async ()=> {
  try {
    const data = await fetchCartData(); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error}
  }
})
// async actions
export const resetCartProductsAsync = createAsyncThunk("cart/resetCartProducts", async ()=> {
  try {
    const data = await resetCartProducts(); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error}
  }
})

// async actions
export const  deleteCartProductAsync = createAsyncThunk("cart/deleteCartProduct", async ({product})=> {
  try {
    const data = await deleteCartProduct(product); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error: error.message()}
  }
})

// async actions
export const  editCartProductAsync = createAsyncThunk("cart/editCartProduct", async ({product, quantity})=> {
  try {
    const data = await editQuantityCartProduct({product, quantity}); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error: error.message()}
  }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [],
        loading: false,
        totalPrice: 0,
        error: ""
    },
    reducers: {
      totalPriceCalculate: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value += 1
      },
      resetCartProducts: state => {
        state.cartProducts = []
      },
      setCartProductsFromServerSideProps: (state, action) =>{
        state.cartProducts = action.payload;

        const tp = calculateTotalPrice(action.payload);
        state.totalPrice = tp;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCartDataAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchCartDataAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.cartProducts = action.payload.products;

          const totalPrice = calculateTotalPrice(action.payload.products);
          state.totalPrice = totalPrice;
        })
        .addCase(fetchCartDataAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(editCartProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(editCartProductAsync.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload)

          const productId = action.payload.editedProduct._id;
          const newQuantity = action.payload.newQuantity;
          console.log(productId, newQuantity)
          // const newItems = state.cartProducts.map(product => product._id === productId ? {...product, quantity:newQuantity } : product)
          // state.cartProducts = newItems;

          const updatedCartProducts = state.cartProducts.map(product => {
            if (product.product._id === productId) {
              return {
                ...product,
                quantity: newQuantity
              };
            } else {
              return product;
            }
          });
        
          state.cartProducts = updatedCartProducts;

          const totalPrice = calculateTotalPrice(state.cartProducts);
          state.totalPrice = totalPrice;
        })
        .addCase(editCartProductAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;

        })

        .addCase(deleteCartProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCartProductAsync.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload)
          // find the index of deleted product and remove it
          const productId = action.payload.deletedProduct._id;
          console.log(productId)
          const index = state.cartProducts.findIndex(element => element.product._id === productId)
          state.cartProducts.splice(index, 1);

          const totalPrice = calculateTotalPrice(state.cartProducts);
          state.totalPrice = totalPrice;
        })
        .addCase(deleteCartProductAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.data.error;
        })

        .addCase(resetCartProductsAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(resetCartProductsAsync.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload)
          state.cartProducts = []
          state.totalPrice = 0
        })
        .addCase(resetCartProductsAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.data.error;
        })
    }
  })

  const calculateTotalPrice = (products) =>{
    let totalPrice = 0;
    console.log("total price calculate",products)
    for(let i=0; i<products.length; i++){
      totalPrice += products[i].product.price * products[i].quantity;
    }
    return totalPrice;
  }
  
  export const { totalPriceCalculate, setCartProductsFromServerSideProps} = cartSlice.actions
  
  export const selectUserCartProducts = (state) => state.cart.cartProducts;
  export const selectCartTotalPrice = (state) => state.cart.totalPrice;

  export default cartSlice.reducer;

  