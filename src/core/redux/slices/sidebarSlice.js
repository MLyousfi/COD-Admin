// src/reducers/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedSidebarEpingled = localStorage.getItem("sidebar-epingled") === "true";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        sidebarEpingled: storedSidebarEpingled,
        showSidebar: storedSidebarEpingled,
        showReSidebar: false,
    },
    reducers: {
        setSidebarEpingled: (state, action) => {
            state.sidebarEpingled = action.payload;
            state.showSidebar = action.payload;
            localStorage.setItem("sidebar-epingled", action.payload);
        },
        setShowSidebar: (state, action) => {
            state.showSidebar = action.payload;
        },
        setShowReSidebar: (state, action) => {
            state.showReSidebar = action.payload;
        },
    },
});

// Export actions and reducer
export const { setSidebarEpingled, setShowSidebar, setShowReSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
