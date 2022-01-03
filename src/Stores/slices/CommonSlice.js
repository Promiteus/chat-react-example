import {createSlice} from "@reduxjs/toolkit";


export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        value: 0,
        selectedUser: {},
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        setDefaultValue: (state, action) => {
            state.value = action.payload;
        },
        defineSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    },
})

export const selectCommon = (state) => state.common;
export const {increment, setDefaultValue, defineSelectedUser} = commonSlice.actions;
export default commonSlice.reducer;