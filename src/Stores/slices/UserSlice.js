import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authenticateUser, fullRegistration, registrateUser, TOKEN_KEY} from "../api/AuthApi/AuthApi";


export const authUserAsync = createAsyncThunk(
    'auth/user',
    async (data) => {
        return await authenticateUser(data);
     }
);

export const regUserAsync = createAsyncThunk(
    'auth/addUser',
    async ({username, password, firstName, birthDate, meetPreferences, sex}) => {
        return await fullRegistration({
            username: username,
            password: password,
            firstName: firstName,
            birthDate: birthDate,
            meetPreferences: meetPreferences,
            sex: sex
        });
     }
);

const initialRequestData = ({state, action}) => {
    if (state.loading === 'idle') {
        state.loading = 'pending'
        state.response = {};
        state.status = 0;
        state.currentRequestId = action.meta.requestId;
    }
}

const fulfilledRequestData = ({state, action}) => {
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
}

const rejectRequestData = ({state, action}) => {
    const { requestId } = action.meta
    if (
        (state.loading === 'pending') &&
        (state.currentRequestId === requestId)
    ) {
        state.error = action.error.message;
        state.response = {};
        if (action.error.message) {
            state.status = action.error.message?.match(/[0-9]+/);
        } else if (action.payload) {
            state.status = action.payload.status;
            state.error = action.payload.error;
        } else {
            state.status = 0;
        }
        state.loading = 'idle'
        state.currentRequestId = undefined
    }
}

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
            //Получение JWT токена по логину и паролю
            .addCase(authUserAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(authUserAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(authUserAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            })
            //Регистрация пользователя
            .addCase(regUserAsync.pending, (state, action) => {
                initialRequestData({state, action});
            })
            .addCase(regUserAsync.fulfilled, (state, action) => {
                fulfilledRequestData({state, action});
            })
            .addCase(regUserAsync.rejected, (state, action) => {
                rejectRequestData({state, action});
            });
    },
});

/*
* */

export const selectUser = (state) => state.user;
export const {setDefaultUser} = userSlice.actions;
export default userSlice.reducer;