import { createSlice } from "@reduxjs/toolkit"


const postSlice = createSlice({
    name: "post",
    initialState:{
        posts: [],
        singlePost: null,
        postsCount: 0,
        postsCategoris: [],
        loading: false,
        isCreated: false,
    },
    reducers:{
        setPosts(state, action){
            // console.log("Redux state update", action.payload)
            state.posts = action.payload
        },
        setSinglePosts(state, action){
            // console.log("Redux state update", action.payload)
            state.singlePost = action.payload
        },
        setPostsCount(state, action){
            state.postsCount = action.payload
        },
        setPostsCategoris(state, action){
            state.postsCategoris = action.payload
        },
        setLoading(state){
            state.loading = true;
            state.isCreated = false
        },
        clearLoading(state){
            state.loading = false;
        },
        setIsCreated(state){   
            state.isCreated = true;
        },
        clearIsCreated(state){
            state.isCreated = false;
        },
        setLike(state, action){
            state.singlePost.likes =  action.payload.likes;
        },
        setLikeHome(state, action){
            state.posts = state.posts.map(post => 
                post._id === action.payload._id
                    ? { ...post, likes: action.payload.likes } 
                    : post 
            );
        },
        deletePost(state, action){
            state.posts = state.posts.filter(post => post._id !== action.payload);
        }
    }
})



const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export {postActions, postReducer}