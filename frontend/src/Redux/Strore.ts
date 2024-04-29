import { configureStore } from "@reduxjs/toolkit";
import geminiSlice from "./Slice/Reducer";
import fetchUserSlice from './Slice/User';
const Store = configureStore({
  reducer: {
    geminiSlice,
    fetchUserSlice,
  },
});

export default Store;

export type AppDispatch = typeof Store.dispatch;
export type RootType = ReturnType<typeof Store.getState>
