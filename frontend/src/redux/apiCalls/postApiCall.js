import request from "../../utils/request"
import {toast} from "react-toastify"
import {postActions} from "../slices/postSlice"

//fetch posts based 

export function fetchPosts(){
    return async (dispatch) => {
        try{
            console.log("fetching posts");   
            const {data} = await request.get("/api/posts")
            if(Array.isArray(data.posts)){
                // console.log("is an array");

                dispatch(postActions.setPosts(data.posts));
            }
            else{
                // console.log("not an array");
                dispatch(postActions.setPosts([]));
            }
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}

export function getPostsCount(){
    return async (dispatch) => {
        try{
            const {data} = await request.get("/api/posts/count")
            // console.log("data", data) 
            dispatch(postActions.setPostsCount(data.count));
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}


export function getSinglePost(postId){
    return async (dispatch) => {
        try{
            const {data} = await request.get(`/api/posts/${postId}`)
            console.log("get single post: ", data.post) 
            // console.log(postId);
            dispatch(postActions.setSinglePosts(data.post));
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}

export function createPost(formData){
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            dispatch(postActions.setLoading());
            await request.post("/api/posts", formData,
                {headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            })
        
            toast.success("Post created successfully");
            // console.log("api call", "post created", getState().post);
            setTimeout(() => {
                dispatch(postActions.setIsCreated());
            }, 2000);
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
        finally{
            setTimeout(() => {
                dispatch(postActions.clearLoading());
                dispatch(postActions.clearIsCreated());
            }, 3000);
        }
    }
}



export function toggleLike(postId){
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            const {data} = await request.put(`/api/posts/likes/${postId}`, {}, 
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            )
            dispatch(postActions.setLike(data));

        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}

export function toggleLikeHome(postId){
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            const {data} = await request.put(`/api/posts/likes/${postId}`, {}, 
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            )
            dispatch(postActions.setLikeHome(data));

        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}

export function updatePostImage(postId, newImage){
    return async (dispatch ,getState) => {
        try{
            const token = getState().auth.user.token;
            const {data} = await request.put(`/api/posts/update-image/${postId}`, newImage,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            
            console.log("update post image", data);
            dispatch(postActions.setSinglePosts(data));
            toast.success("image updated successfully");
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}


export function updatePost(postId, formData){
    return async (dispatch ,getState) => {
        try{
            dispatch(postActions.setLoading());
            const token = getState().auth.user.token;
            const {data} = await request.put(`/api/posts/${postId}`, formData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            )
            dispatch(postActions.setSinglePosts(data.post));
            toast.success("post updated successfully");

        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(postActions.clearLoading());
        }
    }
}


export function deletePost(postId){
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            await request.delete(`/api/posts/${postId}`, 
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            )
            // toast.success("Post deleted successfully");
            dispatch(postActions.deletePost(postId));
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}


export function getProfilePosts(postId){
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            await request.delete(`/api/posts/${postId}`, 
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            )
            // toast.success("Post deleted successfully");
            dispatch(postActions.deletePost(postId));
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}