import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import commonSlice from "./slices/CommonSlice";
import userSlice from "./slices/UserSlice";
import profileSlice from "./slices/UserProfileSlices";
import chatSlice from "./slices/ChatSlice";
import searchProfileSlice from "./slices/UserProfileSearchSlice";
import searchBoxSlice from "./slices/SearchBoxSlice";
import userProfileChatsSlice from "./slices/UserProfileChatsSlice";
import userProfileChatCommonSlice from "./slices/UserProfileChatCommonSlice";
import chatMsgSlice from "./slices/ChatMessageSlice";


export default configureStore({
    reducer: {
        common: commonSlice,
        user: userSlice,
        profile: profileSlice,
        chat: chatSlice,
        searchProfile: searchProfileSlice,
        searchBox: searchBoxSlice,
        userChat: userProfileChatsSlice,
        chatCommon: userProfileChatCommonSlice,
        chatMsg: chatMsgSlice,
    },
    middleware: getDefaultMiddleware({serializableCheck: false}),
});