import {createSlice} from "@reduxjs/toolkit";

export const scrollLoaderSlice = createSlice({
    name: 'scrollLoader',
    initialState: {
        page: 0,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        incPage: state => {
            state.page += 1;
        },
        dropPage: state => {
            state.page = 0;
        }
    },
});

export const selectScrollLoader = (state) => state.scrollLoader;
export const { setPage, incPage, dropPage } = scrollLoaderSlice.actions;
export default scrollLoaderSlice.reducer;