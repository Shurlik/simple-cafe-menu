import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        isAdmin: false,
    },
    reducers: {
        setIsAdmin(state) {
            state.isAdmin = !state.isAdmin;
        },
        setToken(state, action) {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        removeToken(state) {
            localStorage.removeItem("token");
            state.token = "";
        },
    },
});

export default userSlice.reducer;

export const { setToken, removeToken } = userSlice.actions;
