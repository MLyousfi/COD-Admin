
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        // add other slices here as needed
    },
});

export default store;
