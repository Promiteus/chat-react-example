import {createSlice} from "@reduxjs/toolkit";

export const searchBoxSlice = createSlice({
    name: 'searchBox',
    initialState: {
        ageCheck: true,
        kidsCheck: false,
        sexOrientationCheck: false,
        sexCheck: false,
        familyCheck: false,
        searchedData: [],
        searchParams: {
            kids: 0,
            ageFrom: 18,
            ageTo: 55,
            sexOrientation: null,
            meetPreferences: null,
            sex: null,
            familyStatus: null,
            country: "Россия",
            region: "",
            locality: ""
        }
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
        setSearchedData: (state, action) => {
            state.searchedData = action.payload;
        },
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        }
    },
})

export const selectSearchBox = (state) => state.searchBox;
export const {setAgeCheck, setKidsCheck, setSexOrientationCheck, setSexCheck, setFamilyCheck, setSearchedData, setSearchParams} = searchBoxSlice.actions;
export default searchBoxSlice.reducer;