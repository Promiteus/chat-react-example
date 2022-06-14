import {createSlice} from "@reduxjs/toolkit";


export const userProfileChatCommonSlice = createSlice({
    name: 'chatCommon',
    initialState: {
        profile: {},
    },
    reducers: {
        defineUserProfileOfChat: (state, action) => {
            state.profile = action.payload;
        }
    },
})

export const selectUserChatCommon = (state) => state.chatCommon;
export const {defineUserProfileOfChat} = userProfileChatCommonSlice.actions;
export default userProfileChatCommonSlice.reducer;