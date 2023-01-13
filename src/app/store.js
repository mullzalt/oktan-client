import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import authReducer from '../features/auth/authSlice'
import { userSlice } from "../features/users/userSlice"
import { generalSlice } from "../features/generalSlice"


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [generalSlice.reducerPath]: generalSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
