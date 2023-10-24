import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"; // since we export it as default we can name it as we want
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer }); //this to combine all the reducer in one place

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware //to prevent error
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// this is how you use it with react and redux

export const persistor = persistStore(store);
