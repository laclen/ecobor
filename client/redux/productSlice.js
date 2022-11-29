import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Platform } from "react-native";

const BASE = Platform.OS === "android" ? "192.168.1.107" : "192.168.1.107";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("FETCH_PRODUCTS", async () => {
  const getProducts = await fetch(`http://${BASE}:3000/api/urunler/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await getProducts.json();
  // console.log(response);
  return response;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.concat(action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
