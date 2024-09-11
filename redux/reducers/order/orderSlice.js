import { createSlice } from "@reduxjs/toolkit";
import { POST_ORDER, PUT_ORDER_SLIP } from "./orderApi";
const initialState = {
  carId: null,
  data: null,
  dataSlip: null,
  currentStep: 0,
  selectedBank: null,
  promo: null,
  isLoading: false,
  isError: false,
  errorMassage: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
    },
    resetState: (state) => {
      state = initialState;
      console.log("state: ", state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(POST_ORDER.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(POST_ORDER.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      console.log("state.data: ", state.data);

      // console.log("data FULLFILLED", action.payload);
    });
    builder.addCase(POST_ORDER.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMassage = action.payload;
    });

    builder.addCase(PUT_ORDER_SLIP.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(PUT_ORDER_SLIP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataSlip = action.payload;
      console.log("state.dataSlip: ", state.dataSlip);
    });
    builder.addCase(PUT_ORDER_SLIP.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMassage = action.payload;
      console.log("error state.dataSlip: ", action.payload);
    });
  },
});

export { POST_ORDER, PUT_ORDER_SLIP };
export const selectOrder = (state) => state.order;
export const { setCarId, setBank, setPromo, setStateByName, resetState } =
  orderSlice.actions;
export default orderSlice.reducer;
