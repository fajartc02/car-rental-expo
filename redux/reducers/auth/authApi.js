import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_LOGIN = createAsyncThunk(
  "POST_LOGIN",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) {
        return rejectWithValue("Please fill all the inputs");
      }
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/login",
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

      const data = await response.json();
      if (data?.message) {
        let errorMsg = data?.message || "Error System";
        throw new Error(errorMsg);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
