import {createSlice} from "@reduxjs/toolkit";

export const searchBoxSlice = createSlice({
    name: 'searchBox',
    initialState: {
        ageCheck: true,
        kidsCheck: true,
        sexOrientationCheck: true,
        sexCheck: true,
        familyCheck: true,
    },
    reducers: {
        setAgeCheck: (state, action) => {
            state.ageCheck = action.payload;
        },
        setKidsCheck: (state, action) => {
            state.kidsCheck = action.payload;
        },
        setSexOrientationCheck: (state, action) => {
            state.sexOrientationCheck = action.payload;
        },
        setSexCheck: (state, action) => {
            state.sexCheck = action.payload;
        },
        setFamilyCheck: (state, action) => {
            state.familyCheck = action.payload;
        },
    },
})

export const selectSearchBox = (state) => state.searchBox;
export const {setAgeCheck, setKidsCheck, setSexOrientationCheck, setSexCheck, setFamilyCheck} = searchBoxSlice.actions;
export default searchBoxSlice.reducer;