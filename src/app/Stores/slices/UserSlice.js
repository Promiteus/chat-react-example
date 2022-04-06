import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenticateUser, fullRegistration, removeFullUserAccountData} from "../api/AuthApi/AuthApi";
import {fulfilledRequestData, initialRequestData, rejectRequestData} from "../api/Common/ApiCommon";


export const deleteUserAccountAsync = createAsyncThunk(
    'auth/deleteAccount',
    async ({userId, isAccountOnly}) => {
        return await removeFullUserAccountData({userId, isAccountOnly});
     }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        response: {},
        status: 0,
        error: '',
        loading: false,
        currentRequestId: undefined,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Полное удаление аккаунта пользователя из системы
            .addCase(deleteUserAccountAsync.pending, (state, action) => {
            initialRequestData({state, action});
            })
            .addCase(deleteUserAccountAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(deleteUserAccountAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            });
    },
});

/*
* */

export const selectUser = (state) => state.user;
export const {setDefaultUser} = userSlice.actions;
export default userSlice.reducer;