import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editAdminProduct, fetchAllAdminProducts } from "./productAPI";


// async actions
export const fetchAllAdminProductsAsync = createAsyncThunk("product/fetchAllAdminProducts", async ()=> {
  try {
    const data = await fetchAllAdminProducts(); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error}
  }
})
// async actions
export const editAdminProductAsync = createAsyncThunk("product/editAdminProduct", async ({product})=> {
  try {
    const data = await editAdminProduct({product}); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error}
  }
})



const productSlice = createSlice({
    name: 'product',
    initialState: {
        adminProducts: [],
        loading: false,
        error: ""
    },
    reducers: {
      setAllAdminProductsFromServerSide: (state, action) => {
        state.adminProducts = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllAdminProductsAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllAdminProductsAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.adminProducts = action.payload;

        })
        .addCase(fetchAllAdminProductsAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(editAdminProductAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(editAdminProductAsync.fulfilled, (state, action) => {
          state.loading = false;
          const newProduct = action.payload.product;
          
          const newArray = state.adminProducts.map((product) => product._id === newProduct._id ? newProduct : product)
          state.adminProducts = newArray;
          
        })
        .addCase(editAdminProductAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    }
  })
  
  export const { setAllAdminProductsFromServerSide} = productSlice.actions
  
  export const selectAdminProducts = (state) => state.product.adminProducts;
  export const loading = (state) => state.product.loading;
  export const error = (state) => state.product.error;

  export default productSlice.reducer;

  