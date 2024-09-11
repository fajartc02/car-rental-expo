import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export const POST_ORDER = createAsyncThunk(
  "POST_ORDER",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      console.log("FORM DATA FROM API", formData);

      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token: token,
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const data = await response.json();
      // console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const PUT_ORDER_SLIP = createAsyncThunk(
  "PUT_ORDER_SLIP",
  async ({ token, id, formData }, { rejectWithValue }) => {
    try {
      var slipImg = new FormData();
      console.log("FORM DATA FROM API", formData);
      let img = {
        uri: formData.uri,
        type: formData.mimeType,
        name: formData.fileName,
      };
      slipImg.append("slip", img);
      // // console.log(token, id);
      // console.log(
      //   "HIT: ",
      //   `https://api-car-rental.binaracademy.org/customer/order/${id}/slip`
      // );
      // console.log("slipImg", slipImg);

      const response = await fetch(
        `https://api-car-rental.binaracademy.org/customer/order/${id}/slip`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            access_token: token,
          },
          body: slipImg,
        }
      );
      const data = await response?.json();
      console.log("data Order API: ", data);

      if (!data?.CarId) throw new Error(data.message);
      return data;
    } catch (error) {
      console.log(JSON.stringify(error));
      return rejectWithValue(error);
    }
  }
);
