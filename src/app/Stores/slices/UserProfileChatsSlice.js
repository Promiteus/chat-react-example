import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fulfilledRequestData, initialRequestData, rejectRequestData, TOKEN_KEY} from "../api/Common/ApiCommon";
import {getUserProfileChatsPageable} from "../api/ChatApi/ChatApi";

/**
 *
 * @type {AsyncThunk<AxiosResponse<*>, {readonly userId?: *, readonly size?: *, readonly page?: *}, {}>}
 */
export const userProfileChatsAsync = createAsyncThunk(
    'user/chats',
    async ({page, size, userId}) => {
        let token = localStorage.getItem(TOKEN_KEY);
        return await getUserProfileChatsPageable(page, size, userId, token);
    }
);
/**
 *
 * @type {Slice<{response: {}, error: string, loading: boolean, status: number, currentRequestId: undefined}, {dropStatus: reducers.dropStatus}, string>}
 */
export const userProfileChatsSlice = createSlice({
    name: 'userChat',
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
        },
    },
    extraReducers: (builder) => {
        builder
            //Получить последнюю переписку двух пользователей пострнично
            .addCase(userProfileChatsAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(userProfileChatsAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(userProfileChatsAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
    }
});

export const selectUserChats = (state) => state.userChat;
export const {dropStatus} = userProfileChatsSlice.actions;
export default userProfileChatsSlice.reducer;