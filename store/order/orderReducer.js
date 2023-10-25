import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewOrder, fetchAllOrdersAdmin } from "./orderAPI";
import { resetCartProducts } from "../cart/cartReducer";

// async actions
export const fetchAllOrdersAsync = createAsyncThunk("cart/fetchAllOrders", async ()=> {
  try {
    const data = await fetchAllOrdersAdmin(); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error}
  }
})

// async actions
export const createNewOrderAsync = createAsyncThunk("cart/createNewOrder", async ({products, address, totalPrice, paymentOption})=> {
  try {
    const data = await createNewOrder({products, address, totalPrice, paymentOption}); // Use the cartAPI to fetch cart data
    return data;
  } catch (error) {
    return {error}
  }
})

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        userOrders: [],
        adminOrders: [],
        currentOrderFullfilled: false,
        currentOrderDetails: {},
        loading: false,
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
      setCurrentOrderFullfilledToFalse: state => {
        state.currentOrderFullfilled = false
      },
      setCartProductsFromServerSideProps: (state, action) =>{
        state.cartProducts = action.payload;

        const tp = calculateTotalPrice(action.payload);
        state.totalPrice = tp;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllOrdersAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.adminOrders = action.payload;

        })
        .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(createNewOrderAsync.pending, (state) => {
          state.loading = true;
          state.currentOrderFullfilled = false
        })
        .addCase(createNewOrderAsync.fulfilled, (state, action) => {
          state.loading = false;
          //   TODO: do something here
          state.userOrders.push(action.payload);
          state.currentOrderFullfilled = true
          
          // now set cart items to null as it is of no need now.
        })
        .addCase(createNewOrderAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.currentOrderFullfilled = false
        })
    }
  })
  
  export const { totalPriceCalculate, setCartProductsFromServerSideProps, setCurrentOrderFullfilledToFalse} = orderSlice.actions
  
//   export const selectUserCartProducts = (state) => state.cart.cartProducts;
  export const currentOrderFullfilled = (state) => state.order.currentOrderFullfilled;

  export default orderSlice.reducer;

  