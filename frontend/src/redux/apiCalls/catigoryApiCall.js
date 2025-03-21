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