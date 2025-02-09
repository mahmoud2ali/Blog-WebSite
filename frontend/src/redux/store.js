import {configureStore} from "@reduxjs/toolkit"
import { authActions, authReducer } from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;