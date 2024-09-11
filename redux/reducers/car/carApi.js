import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("fetchCars", async(signal) => {
    const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/car", {
            signal: signal,
        }
    );

    const data = await response.json();
    return data;
});

export const fetchCarDetails = createAsyncThunk(
    "fetchCarDetails",
    async(id, { signal }) => {
        const response = await fetch(
            `https://api-car-rental.binaracademy.org/customer/car/${id}`,
            signal
        );
        const data = await response.json();
        return data;
    }
);