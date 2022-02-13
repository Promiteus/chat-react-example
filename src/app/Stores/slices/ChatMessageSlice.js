import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fulfilledRequestData, initialRequestData, rejectRequestData, TOKEN_KEY} from "../api/Common/ApiCommon";
import {addMessage} from "../api/ChatApi/ChatApi";

export const addChatMessageAsync = createAsyncThunk(
    'add/message',
    async ({userId, fromUserId, message}) => {
        let token = localStorage.getItem(TOKEN_KEY);
        return await addMessage({userId, fromUserId, message}, token);
    }
);

export const chatMsgSlice = createSlice({
    name: 'chatMsg',
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
            //Получение профиль пользователя по userId и токену авторизации
            .addCase(addChatMessageAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(addChatMessageAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(addChatMessageAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
    }
})

export const selectChatMsg = (state) => state.chatMsg;
export const {dropStatus} = chatMsgSlice.actions;
export default chatMsgSlice.reducer;