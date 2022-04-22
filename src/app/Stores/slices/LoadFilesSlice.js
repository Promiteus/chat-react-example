import {createSlice} from "@reduxjs/toolkit";


export const loadFilesSlice = createSlice({
    name: 'filesChanged',
    initialState: {
        fileListChanged: 0,
    },
    reducers: {
        setFilesChanged: (state, action) => {
            state.fileListChanged += 1;
        }
    }
});

export const selectFilesChange = (state) => state.filesChanged;
export const {setFilesChanged} = loadFilesSlice.actions;
export default loadFilesSlice.reducer;