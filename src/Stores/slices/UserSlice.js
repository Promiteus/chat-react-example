import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenticateUset, registrateUser} from "../api/AuthApi/AuthApi";

export const authUserAsync = createAsyncThunk(
    'auth/user',
    async (data) => {
        const response = await authenticateUset(data);
        return response.data;
    }
);

export const regUserAsync = createAsyncThunk(
    'auth/add_user',
    async (data) => {
        const response = await registrateUser(data);
        return response.data;
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        token_expire_sec: '',
        user_id: '',
    },
    reducers: {
        setDefaultUser: (state, action) => {
            state = action.payload;
        }
    }

});

export const selectUser = (state) => state.user;
export const {setDefaultUser} = userSlice.actions;
export default userSlice.reducer;