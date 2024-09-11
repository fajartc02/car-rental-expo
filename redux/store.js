import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailsSlice from "./reducers/car/carDetailsSlice";
import loginSlice from "./reducers/auth/loginSlice";
import orderSlice from "./reducers/order/orderSlice";
import { combineReducers } from "redux";

import createSecureStore from "redux-persist-expo-securestore";
import { persistStore, persistReducer } from "redux-persist";

// pnpm i @reduxjs/toolkit react-redux
// pnpm i -D reactotron-redux reactotron-react-native

const secureStore = createSecureStore();
// import storage from 'redux-persist/lib/storage'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: "root",
  storage: secureStore,
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  enhancers: (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers().concat(reactotron.createEnhancer())
      : getDefaultEnhancers(),
  reducer: {
    car: carSlice,
    carDetail: carDetailsSlice,
    login: persistReducer(persistConfig, loginSlice),
    order: orderSlice,
  },
});

export const persistor = persistStore(store);
