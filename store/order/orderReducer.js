import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewOrder, deliverOrder, fetchAllOrdersAdmin } from "./orderAPI";
import { resetCartProducts } from "../cart/cartReducer";
import { DELIVERED } from "../../data/orderStatus";

// async actions
export const fetchAllOrdersAsync = createAsyncThunk("order/fetchAllOrders", async ()=> {
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

// async actions
export const deliverOrderAsync = createAsyncThunk("order/deliverOrder", async ({orderId})=> {
  try {
    const data = await deliverOrder({orderId}); // Use the cartAPI to fetch cart data
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
        currentOrderFullfilled: false, // given order created or not
        currentOrderDetails: {},
        loading: false,
        error: ""
    },
    reducers: {
      setAllOrdersFromServerSide: (state, action) => {
        state.adminOrders = action.payload
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
          console.log("inside reducer actions ",action.payload)
          const razorpayOrder = action.payload.razorpayOrder;
          state.userOrders.push(action.payload.order);
          state.currentOrderFullfilled = true
          
          // now set cart items to null as it is of no need now.
        })
        .addCase(createNewOrderAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.currentOrderFullfilled = false
        })

        .addCase(deliverOrderAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(deliverOrderAsync.fulfilled, (state, action) => {
          state.loading = false;
         // if delivered then change the status of the order from ongoing to delivered on client state
         const orderId = action.payload;
         const newState = state.adminOrders.map(order => order._id === orderId ? {...order, status: DELIVERED}: order);
         state.adminOrders = newState;
        })
        .addCase(deliverOrderAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          // if rejected show that error
        })
    }
  })
  
  export const { totalPriceCalculate, setCartProductsFromServerSideProps, setCurrentOrderFullfilledToFalse, setAllOrdersFromServerSide} = orderSlice.actions
  
//   export const selectUserCartProducts = (state) => state.cart.cartProducts;
  export const currentOrderFullfilled = (state) => state.order.currentOrderFullfilled;
  export const selectAdminOrders = (state) => state.order.adminOrders;

  export default orderSlice.reducer;

  