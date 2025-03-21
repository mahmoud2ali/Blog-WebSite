import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    catigories: []
}

const catigorySlice = createSlice({
    name: "catigory",
    initialState,
    reducers: {
        setCatigories(state, action){
            state.catigories = action.payload;
        }
    }
})


const catigoryReducer = catigorySlice.reducer;
const catigoryActions = catigorySlice.actions;

export {catigoryActions, catigoryReducer}