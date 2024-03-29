import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Platform } from "react-native";

const BASE = Platform.OS === "android" ? "192.168.1.120" : "192.168.1.120";

const initialState = {
  products: [],
  productInfo: [],
  status: "idle",
  productInfoStatus: "",
  error: null,
};

// fetch all the products
export const fetchData = createAsyncThunk("FETCH_PRODUCTS", async () => {
  const getProducts = await fetch(`http://${BASE}:3000/api/urunler/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await getProducts.json();
  return response;
});

// get product with id
export const getProductInfo = createAsyncThunk(
  "GET_PRODUCT",
  async (productId) => {
    const getProduct = await fetch(
      `http://${BASE}:3000/api/urunler/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await getProduct.json();
    // console.log(response);
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
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
      })
      .addCase(getProductInfo.pending, (state, action) => {
        state.productInfo = "loading";
      })
      .addCase(getProductInfo.fulfilled, (state, action) => {
        state.productInfo = action.payload;
      })
      .addCase(getProductInfo.rejected, (state, action) => {
        state.productInfo = "loading";
      });
  },
});

export default productSlice.reducer;
