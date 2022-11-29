import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";
const BASE = Platform.OS === "android" ? "192.168.1.107" : "192.168.1.107";
const PORT = "3000";

const initialState = {
  customer: {},
  error: {},
  registerVerified: "",
  loginVerified: "",
};

// customer user action
export const registerCustomer = createAsyncThunk(
  "REGISTER_CUSTOMER",
  async (authData) => {
    // derive the data from authData
    const { fullName, email, password, phoneNumber, address } = authData;

    const postRequest = await fetch(
      `http://${BASE}:${PORT}/api/customer/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          phoneNumber,
          address,
        }),
      }
    );
    const response = await postRequest.json();
    //  console.log(response)
    return response;
  }
);

// customer login action
export const loginCustomer = createAsyncThunk(
  "LOGIN_CUSTOMER",
  async (authData) => {
    // derive the data from authData by deconstructuring it
    const { email, password } = authData;
    //  console.log(email)
    const postRequest = await fetch(
      `http://${BASE}:${PORT}/api/customer/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const response = await postRequest.json();
    //  console.log(response)
    return response;
  }
);

const authSlice = createSlice({
  name: "authorization",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(registerCustomer.pending, (state) => {
        state.registerVerified = "trying";
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.registerVerified = "success";
        state.customer = action.payload;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.registerVerified = "failed";
        state.error = action.payload;
      })
      .addCase(loginCustomer.pending, (state) => {
        state.loginVerified = "trying";
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.loginVerified = "success";
        state.customer = action.payload;
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.loginVerified = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
