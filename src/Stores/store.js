import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import counterSlice from "./slices/CommonSlice";
import userSlice from "./slices/UserSlice";
import profileSlice from "./slices/UserProfileSlices";


export default configureStore({
    reducer: {
        counter: counterSlice,
        user: userSlice,
        profile: profileSlice,
    },
    middleware: getDefaultMiddleware({serializableCheck: false}),
});