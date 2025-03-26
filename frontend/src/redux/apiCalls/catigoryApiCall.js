import { toast } from "react-toastify";
import request from "../../utils/request"
import { catigoryActions } from "../slices/catigorySlice";

export function fetchCatigories(){
    return async(dispatch)=>{
        try{
            // console.log("api call, fetchCatigories.");
            const {data} = await request.get("/api/categories");
            dispatch(catigoryActions.setCatigories(data));
            // console.log("get the data", data);
        }
        catch(error)
        {
           console.log(error.response.data.message);
        }
    }
}

export function createCategory(newCategory){
    return async(dispatch, getState)=>{
        try{
            const token =  getState().auth.user.token;
            const { data } = await request.post("/api/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(catigoryActions.addCategory(data));
        }
        catch(error)
        {
           console.log(error.response.data.message);
        }
    }
}


export function deleteCategory(categoryId){
    return async(dispatch, getState)=>{
        try{
            const token =  getState().auth.user.token;
            const { data } = await request.delete(`/api/categories/${categoryId}`,{
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            dispatch(catigoryActions.deleteCategory(data.categoryId));
            toast("category deleted successfully")
        }
        catch(error)
        {
           console.log(error.response.data.message);
        }
    }
}