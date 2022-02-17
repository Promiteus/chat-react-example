import {createSlice} from "@reduxjs/toolkit";

/**
 *
 * @type {Slice<{pageIndex: number, tbIndex: number, selectedUser: {}, value: number}, {setDefaultValue: reducers.setDefaultValue, defineSelectedUser: reducers.defineSelectedUser, setTabIndex: reducers.setTabIndex, setPageIndex: reducers.setPageIndex, increment: reducers.increment}, string>}
 */
export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        value: 0,
        selectedUser: {},
        pageIndex: 0,
        tbIndex: 0,
        chatSelectedUser: null,
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
        },
        setPageIndex: (state, action) => {
            state.pageIndex = action.payload;
        },
        setChatSelectedUser: (state, action) => {
            state.chatSelectedUser = action.payload;
        }
    },
})

export const selectCommon = (state) => state.common;
export const {increment, setDefaultValue, defineSelectedUser, setPageIndex, setChatSelectedUser} = commonSlice.actions;
export default commonSlice.reducer;