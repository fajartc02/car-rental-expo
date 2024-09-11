import { createSlice } from "@reduxjs/toolkit";
import { POST_LOGIN } from "./authApi";
import * as SecureStore from "expo-secure-store";
// import AsyncStorage from '@react-native-async-storage/async-storage';



const setStore = (value) => SecureStore.setItem("user", JSON.stringify(value));

const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: null,
        isLoading: false,
        isError: false,
        errorMassage: null
    },
    reducers: {
        LOGOUT: (state) => {
            setStore(null);
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(POST_LOGIN.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(POST_LOGIN.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                setStore(action.payload);
            })
            .addCase(POST_LOGIN.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMassage = action.payload;
            });
    },
});

export { POST_LOGIN };
export const selectLogin = (state) => state.login;
export const { LOGOUT } = loginSlice.actions;
export default loginSlice.reducer;