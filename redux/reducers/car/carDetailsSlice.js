import { createSlice } from "@reduxjs/toolkit";
import { fetchCarDetails } from "./carApi";

const carDetailSlice = createSlice({
    name: "carDetail",
    initialState: {
        data: [],
        isLoading: false,
        isError: false,
        errorMassage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCarDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCarDetails.rejected, (state, action) => {
                state.isError = true;
                state.errorMassage = action.error;
            });
    },
});

export const getCarDetail = fetchCarDetails;
export const selectDetailCar = (state) => state.carDetail;
export default carDetailSlice.reducer;