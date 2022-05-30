import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import commonSlice from "./slices/CommonSlice";
import userSlice from "./slices/UserSlice";
import profileSlice from "./slices/UserProfileSlices";
import chatSlice from "./slices/ChatSlice";
import searchBoxSlice from "./slices/SearchBoxSlice";
import userProfileChatsSlice from "./slices/UserProfileChatsSlice";
import userProfileChatCommonSlice from "./slices/UserProfileChatCommonSlice";
import chatMsgSlice from "./slices/ChatMessageSlice";
import updateChatMessageStatusSlice from "./slices/UpdateChatMessageStatusSlice";
import loadFilesSlice from "./slices/LoadFilesSlice";
import scrollLoaderSlice from "./slices/ScrollLoaderSlice";


export default configureStore({
    reducer: {
        common: commonSlice,
        user: userSlice,
        profile: profileSlice,
        chat: chatSlice,
        searchBox: searchBoxSlice,
        scrollLoader: scrollLoaderSlice,
        userChat: userProfileChatsSlice,
        chatCommon: userProfileChatCommonSlice,
        chatMsg: chatMsgSlice,
        chatMsgStatus: updateChatMessageStatusSlice,
        filesChanged: loadFilesSlice,
    },
    middleware: getDefaultMiddleware({serializableCheck: false}),
});