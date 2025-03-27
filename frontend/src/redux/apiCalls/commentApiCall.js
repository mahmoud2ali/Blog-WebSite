import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";
import request from "../../utils/request"
import { commentActions } from "../slices/commentSlice";

export function createComment(newComment)
{
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            const {data} = await request.post("/api/comments", newComment,
                {
                    headers:{
                        Authorization: "Bearer " + token
                    }
                });
            
            dispatch(postActions.addComment(data))
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }
}



export function deleteComment(commentId)
{
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            await request.delete(`/api/comments/${commentId}`,
                {
                    headers:{
                        Authorization: "Bearer " + token
                    }
                });
            
                dispatch(commentActions.deleteComment(commentId));
                if(getState().post.singlePost?.comments){
                    dispatch(postActions.deleteComment(commentId));
                }
        }
        catch(error){
            toast.error(error.response.data.message);
            
        }
    }
}


export function fetchComments()
{
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.user.token;
            const {data} = await request.get(`/api/comments`,
                {
                    headers:{
                        Authorization: "Bearer " + token
                    }
                });
            
                dispatch(commentActions.getAllComments(data));
            }
        catch(error){
            toast.error(error.response.data.message);
        }
    }
}


