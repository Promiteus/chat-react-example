import {createSlice} from "@reduxjs/toolkit";

/**
 *
 * @type {Slice<{data: {writeMsg: [], readMsg: []}}, {setChatMessageStatus: reducers.setChatMessageStatus}, string>}
 */
export const updateChatMessageStatusSlice = createSlice({
    name: 'chatMsgStatus',
    initialState: {
        data: {
            readMsg: [],
            writeMsg: [],
        }
    },
    reducers: {
        setChatMessageStatus: (state, action) => {
            state.data = action.payload;
        }
    },
});

export const selectUpdateChatMessageStatus = (state) => state.chatMsgStatus;
export const {setChatMessageStatus} = updateChatMessageStatusSlice.actions;
export default updateChatMessageStatusSlice.reducer;