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
        },
        addCategory(state, action){
            state.catigories.push(action.payload);
        },
        deleteCategory(state, action)
        {
            state.catigories = state.catigories.filter(c => c._id != action.payload);
        }
    }
})


const catigoryReducer = catigorySlice.reducer;
const catigoryActions = catigorySlice.actions;

export {catigoryActions, catigoryReducer}