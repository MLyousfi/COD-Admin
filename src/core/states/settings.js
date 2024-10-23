import {createSlice} from '@reduxjs/toolkit'

const settings = createSlice({
    name: 'settings',
    initialState: {
        isSidebarOpen: false,
    },
    reducers: {
        setSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload
        }
    },
})

export const {setSidebarOpen} = settings.actions

export default settings.reducer;
