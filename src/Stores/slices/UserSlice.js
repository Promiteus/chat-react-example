import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenticateUset, registrateUser} from "../api/AuthApi/AuthApi";


export const authUserAsync = createAsyncThunk(
    'auth/user',
    async (data) => {
        return await authenticateUset(data);
     }
);

export const regUserAsync = createAsyncThunk(
    'auth/addUser',
    async (data) => {
        return await registrateUser(data);
     }
);


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        response: {},
        status: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authUserAsync.fulfilled, (state, action) => {
               // console.log("action: "+JSON.stringify(action));
                state.response = action.payload.data;
                state.status = action.payload.status;
            });
    },

});

/*
* */

export const selectUser = (state) => state.user;
export const {setDefaultUser} = userSlice.actions;
export default userSlice.reducer;