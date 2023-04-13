import {combineReducers, configureStore} from "@reduxjs/toolkit";
import menuSlice from "./slices/menu";
import userSlice from "./slices/user";

// adding Slice as we added reducers before
const rootReducer = combineReducers({
    menu: menuSlice,
    user: userSlice,
});

export const store = configureStore({
    reducer: rootReducer
});
