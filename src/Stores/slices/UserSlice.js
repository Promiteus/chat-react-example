import {createSlice} from "@reduxjs/toolkit";


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