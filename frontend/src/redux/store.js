import {configureStore} from "@reduxjs/toolkit"
import { authActions, authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileslice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer 
    }
});

export default store;