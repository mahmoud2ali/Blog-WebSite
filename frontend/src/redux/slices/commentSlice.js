import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    comments: []
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        getAllComments(state, action){
            state.comments = action.payload;
        },
        deleteComment(state, action)
        {
            state.comments = state.comments.filter(c => c !== action.payload)
        }
    }
})

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export {commentActions, commentReducer}