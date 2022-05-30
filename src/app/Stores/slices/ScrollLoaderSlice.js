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
        }
    },
});

export const selectScrollLoader = (state) => state.scrollLoader;
export const { setPage, incPage } = scrollLoaderSlice.actions;
export default scrollLoaderSlice.reducer;