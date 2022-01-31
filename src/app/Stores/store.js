import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import commonSlice from "./slices/CommonSlice";
import userSlice from "./slices/UserSlice";
import profileSlice from "./slices/UserProfileSlices";
import chatSlice from "./slices/ChatSlice";
import searchProfileSlice from "./slices/UserProfileSearchSlice";


export default configureStore({
    reducer: {
        common: commonSlice,
        user: userSlice,
        profile: profileSlice,
        chat: chatSlice,
        searchProfile: searchProfileSlice,
    },
    middleware: getDefaultMiddleware({serializableCheck: false}),
});