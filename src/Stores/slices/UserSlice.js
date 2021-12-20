import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenticateUset, registrateUser} from "../api/AuthApi/AuthApi";
import {saveUserProfile} from "../api/ChatDataApi/ChatDataApi";


export const authUserAsync = createAsyncThunk(
    'auth/user',
    async (data) => {
        return  await authenticateUset(data);
    }
);

export const regUserAsync = createAsyncThunk(
    'auth/add_user',
    async (data) => {
        return await registrateUser(data);
    }
);

export const userProfile = createAsyncThunk(
    'data/profile',
    async (profile) => {
        return await saveUserProfile(profile);
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
       profile: {
           id: 0,
           firstName: 'Roman',
       }
    },
    reducers: {
        setDefaultUser: (state, action) => {
            state = action.payload;
        }
    }

});

export const selectUser = (state) => state.user.profile;
export const {setDefaultUser} = userSlice.actions;
export default userSlice.reducer;