import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileslice";
import { postReducer } from "./slices/postSlice";
import { catigoryReducer } from "./slices/catigorySlice";
import { commentReducer } from "./slices/commentSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer ,
        post: postReducer,
        catigory: catigoryReducer,
        comment: commentReducer
    }
});

export default store;