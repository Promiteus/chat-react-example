import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenticateUset, registrateUser} from "../api/AuthApi/AuthApi";



export const authUserAsync = createAsyncThunk(
    'auth/user',
    async (data) => {
        return await authenticateUset(data);
     }
);

export const regUserAsync = createAsyncThunk(
    'auth/addUser',
    async (data) => {
        return await registrateUser(data);
     }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        response: {},
        status: 0,
        error: '',
        loading: 'idle',
        currentRequestId: undefined,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authUserAsync.pending, (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                    state.response = {};
                    state.status = 0;
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(authUserAsync.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (
                    (state.loading === 'pending') &&
                    (state.currentRequestId === requestId)
                ) {
                    state.response = action.payload.data;
                    state.status = action.payload.status;
                    state.error = '';
                    state.currentRequestId = undefined;
                    state.loading = 'idle';
                }
            })
            .addCase(authUserAsync.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    (state.loading === 'pending') &&
                    (state.currentRequestId === requestId)
                ) {
                    state.error = action.error.message;
                    state.response = {};
                    if (action.error.message) {
                        state.status = action.error.message.match(/[0-9]+/);
                    } else {
                        state.status = 0
                    }
                    state.loading = 'idle'
                    state.currentRequestId = undefined
                }
            });
    },

});

/*
* */

export const selectUser = (state) => state.user;
export const {setDefaultUser} = userSlice.actions;
export default userSlice.reducer;