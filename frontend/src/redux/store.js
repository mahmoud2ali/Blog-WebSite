import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileslice";
import { postReducer } from "./slices/postSlice";
import { catigoryReducer } from "./slices/catigorySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer ,
        post: postReducer,
        catigory: catigoryReducer
    }
});

export default store;