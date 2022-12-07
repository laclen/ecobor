import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Platform } from "react-native"
const BASE = Platform.OS === "android" ? "192.168.1.120" : "192.168.1.120"
const PORT = "3000"

const initialState = {
  customer: {},
  favorites: [],
  status: "idle",
  error: null,
}

// get customer action
export const getCustomer = createAsyncThunk(
  "GET_CUSTOMER",
  async (customerId) => {
    const getRequest = await fetch(
      `http://${BASE}:${PORT}/api/customer/${customerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const response = await getRequest.json()
    // console.log(response)
    return response
  }
)

// add given item to favorites list of given customer or delete item if its in favorites
export const updateFavorites = createAsyncThunk(
  "UPDATE_FAVORITES",
  async (customerId, productId) => {
    // add product into customer's favorites
    const putRequest = await fetch(
      `http://${BASE}:${PORT}/api/customer/favoriler/${customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      }
    )

    // delete product from customer's favorites
    const response = await putRequest.json()
    // console.log(response)
    return response
  }
)

const customerSlice = createSlice({
  name: "authorization",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.customer = action.payload
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
      })
  },
})

export default customerSlice.reducer
