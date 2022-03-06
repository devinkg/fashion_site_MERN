import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "cart",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.currentUser = null;
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});


export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;