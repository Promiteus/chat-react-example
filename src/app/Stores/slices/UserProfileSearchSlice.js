import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fulfilledRequestData, initialRequestData, rejectRequestData, TOKEN_KEY} from "../api/Common/ApiCommon";
import {searchUserProfilesPageable} from "../api/ChatDataApi/ChatDataApi";


/**
 * Метод поиска профилей пользователей за искобчением профиля с userId и по параметрам searchBody
 * @type {AsyncThunk<AxiosResponse<*>, {readonly userId?: *, readonly page?: *, readonly searchBody?: *}, {}>}
 */
export const userProfileSearchAsync = createAsyncThunk(
    'profile/search',
    async ({userId, page, searchBody}) => {
        let token = localStorage.getItem(TOKEN_KEY);
        return await searchUserProfilesPageable(userId, page, token, searchBody);
    }
);

export const searchProfileSlice = createSlice({
    name: 'searchProfile',
    initialState: {
        response: {},
        status: 0,
        error: '',
        loading: false,
    },
    reducers: {
        dropStatus: (state) => {
            state.status = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            //Поиск профилей пользователей за искобчением профиля с userId и по параметрам searchBody
            .addCase(userProfileSearchAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(userProfileSearchAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(userProfileSearchAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
    }
});

export const selectSearchProfile = (state) => state.searchProfile;
export const {dropStatus} = searchProfileSlice.actions;
export default searchProfileSlice.reducer;