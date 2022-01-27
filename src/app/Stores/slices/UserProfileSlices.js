import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUserProfile, removeUserProfile, saveUserProfile} from "../api/ChatDataApi/ChatDataApi";
import {fulfilledRequestData, initialRequestData, rejectRequestData, TOKEN_KEY} from "../api/Common/ApiCommon";

/**
 * Получить профиль пользователя по userId
 * @type {AsyncThunk<AxiosResponse<*>, {readonly userId?: *}, {}>}
 */
export const userProfileAsync = createAsyncThunk(
   'profile/get',
   async ({userId}) => {
       let token = localStorage.getItem(TOKEN_KEY);
       return await getUserProfile(userId, token);
   }
);

/**
 * Удалить профиль пользователя по его userId
 * @type {AsyncThunk<AxiosResponse<*>, {readonly userId?: *}, {}>}
 */
export const deleteProfileAsync = createAsyncThunk(
   'profile/delete',
   async ({userId}) => {
       let token = localStorage.getItem(TOKEN_KEY);
       return await removeUserProfile(userId, token);
   }
);

/**
 * Сохранить/изменить профиль пользователя
 * @type {AsyncThunk<AxiosResponse<*>, {readonly profile?: *}, {}>}
 */
export const saveProfileAsync = createAsyncThunk(
  'profile/save',
  async ({profile}) => {
       let token = localStorage.getItem(TOKEN_KEY);
       return await saveUserProfile(profile, token);
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
    reducers: {
        dropStatus: (state) => {
            state.status = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            //Получение профиль пользователя по userId и токену авторизации
            .addCase(userProfileAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(userProfileAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(userProfileAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
            //Удалить профиль пользователя по userId и токену авторизации.
            .addCase(deleteProfileAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(deleteProfileAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(deleteProfileAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
            //Сохранить/изменить параметры профиля пользователя
            .addCase(saveProfileAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(saveProfileAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(saveProfileAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
    }
});

export const selectProfile = (state) => state.profile;
export const {dropStatus} = profileSlice.actions;
export default profileSlice.reducer;