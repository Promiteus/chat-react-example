import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    removeUserProfile,
} from "../api/ChatDataApi/ChatDataApi";
import {fulfilledRequestData, initialRequestData, rejectRequestData, TOKEN_KEY} from "../api/Common/ApiCommon";


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

    }
});

export const selectProfile = (state) => state.profile;
export const {dropStatus} = profileSlice.actions;
export default profileSlice.reducer;