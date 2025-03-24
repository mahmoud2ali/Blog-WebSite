import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";
import request from "../../utils/request"

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
            
            dispatch(postActions.deleteComment(commentId))
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }
}