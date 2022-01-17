import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {chatUsersMessages} from "../api/ChatApi/ChatApi";
import {fulfilledRequestData, initialRequestData, rejectRequestData, TOKEN_KEY} from "../api/Common/ApiCommon";

export const chatUserAsync = createAsyncThunk(
    'chat/get',
    async ({page, size, userId, fromUserId}) => {
        let token = localStorage.getItem(TOKEN_KEY);
        return await chatUsersMessages(page, size, userId, fromUserId, token)
     }
);

export const chatSlice = createSlice({
    name: 'chat',
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
            .addCase(chatUserAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(chatUserAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(chatUserAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
    }
});

export const selectChat = (state) => state.chat;
export const {dropStatus} = chatSlice.actions;
export default chatSlice.reducer;