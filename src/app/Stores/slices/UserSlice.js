import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenticateUser, fullRegistration, removeFullUserAccountData} from "../api/AuthApi/AuthApi";
import {fulfilledRequestData, initialRequestData, rejectRequestData} from "../api/Common/ApiCommon";


export const authUserAsync = createAsyncThunk(
    'auth/user',
    async (data) => {
        return await authenticateUser(data);
     }
);

export const regUserAsync = createAsyncThunk(
    'auth/addUser',
    async ({username, password, firstName, birthDate, meetPreferences, sex}) => {
        return await fullRegistration({
            username: username,
            password: password,
            firstName: firstName,
            birthDate: birthDate,
            meetPreferences: meetPreferences,
            sex: sex
        });
     }
);

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
            //Получение JWT токена по логину и паролю
            .addCase(authUserAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(authUserAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(authUserAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
            //Регистрация пользователя
            .addCase(regUserAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(regUserAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(regUserAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
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