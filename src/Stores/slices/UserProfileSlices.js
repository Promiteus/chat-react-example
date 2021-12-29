import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TOKEN_KEY} from "../api/AuthApi/AuthApi";
import {getUserProfile, removeUserProfile} from "../api/ChatDataApi/ChatDataApi";
import {fulfilledRequestData, initialRequestData, rejectRequestData} from "../api/Common/ApiCommon";

export const userProfile = createAsyncThunk(
   'profile/get',
   async ({userId}) => {
       let token = localStorage.getItem(TOKEN_KEY);
       return await getUserProfile(userId, token);
   }
);

export const deleteProfile = createAsyncThunk(
   'profile/delete',
   async ({userId}) => {
       let token = localStorage.getItem(TOKEN_KEY);
       return await removeUserProfile(userId, token);
   }
);

export const profileSlice = createSlice({
    name: 'profile',
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
            //Получение профиль пользователя по userId и токену авторизации
            .addCase(userProfile.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(userProfile.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
            //Удалить профиль пользователя по userId и токену авторизации.
            .addCase(deleteProfile.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
    }
});

export const selectProfile = (state) => state.profile;
export default profileSlice.reducer;