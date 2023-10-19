import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCartProduct, editQuantityCartProduct, editQunatityCartProduct, fetchCartData } from "./cartAPI";

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
      totalPriceCalculate: state => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value += 1
      },
      decremented: state => {
        state.value -= 1
      },
      setCartProductsFromServerSideProps: (state, action) =>{
        state.cartProducts = action.payload;
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
          state.cartProducts.splice(index, 1)
        })
        .addCase(deleteCartProductAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.data.error;
        })
    }
  })
  
  export const { totalPriceCalculate, decremented, setCartProductsFromServerSideProps} = cartSlice.actions
  
  export const selectUserCartProducts = (state) => state.cart.cartProducts;

  export default cartSlice.reducer;

  