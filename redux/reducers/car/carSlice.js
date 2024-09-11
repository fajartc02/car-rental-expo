import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./carApi";

const carSlice = createSlice({
    name: "car",
    initialState: {
        data: [],
        isLoading: false,
        isError: false,
        errorMassage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.isError = true;
                state.errorMassage = action.error;
            });
    },
});

export const getCar = fetchCars;
export const selectCars = (state) => state.car;
export default carSlice.reducer;