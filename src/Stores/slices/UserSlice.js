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
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authUserAsync.fulfilled, (state, action) => {
               // console.log("action: "+JSON.stringify(action));
                state.response = action.payload.data;
                state.status = action.payload.status;
                state.error = '';
            })
            .addCase(authUserAsync.rejected, (state, action) => {
                state.error = action.error.message;
                state.response = {};
                if (action.error.message) {
                    state.status = action.error.message.match(/[0-9]+/);
                } else {
                    state.status = 0
                }

            });
    },

});

/*
* */

export const selectUser = (state) => state.user;
export const {setDefaultUser} = userSlice.actions;
export default userSlice.reducer;