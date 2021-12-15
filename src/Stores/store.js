import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./slices/CommonSlice";
import userSlice from "./slices/UserSlice";


export default configureStore({
    reducer: {
        counter: counterSlice,
        user: userSlice,
    },
});