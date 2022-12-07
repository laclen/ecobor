import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productSlice from "./productSlice"
import customerSlice from "./customerSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerSlice,
    product: productSlice,
  },
})

export default store
