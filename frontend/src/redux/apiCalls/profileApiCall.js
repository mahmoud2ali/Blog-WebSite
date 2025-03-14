import {profileActions} from "../slices/profileslice"
import request from "../../utils/request"
import { authActions } from '../slices/authSlice'
import {toast} from "react-toastify"

//ggt user profile
export function getUserProfile(userId){
    return async (dispatch) => {
        try{
            const {data} = await request.get(`api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}


// upload profile photo
export function uploadProfilePhoto(newPhoto){
    return async (dispatch, getState) => {
        try{
            const {data} = await request.post(`api/users/profile/profile-photo-upload`,newPhoto, {
                headers:{
                    Authorization: "Bearer " +  getState().auth.user.token},
                    "Content_Type" : "multipart/form-data"
            });

            dispatch(profileActions.setProfilePhoto(data.profilePhoto));

            dispatch(authActions.setUserPhoto(data.profilePhoto));
            
            toast.success(data.message);

            //modify local storage
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.profilePhoto = data.profilePhoto;
            localStorage.setItem("userInfo", JSON.stringify(user));

        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}


export function updateUserProfile(userId, profile){
    return async (dispatch, getState) => {
        try{
            const {data} = await request.put(`api/users/profile/${userId}`,profile, {
                headers:{
                    Authorization: "Bearer " +  getState().auth.user.token}
            });

            dispatch(profileActions.updateProfile(data));
            dispatch(authActions.setUsername(data.username));

            // const user = JSON.parse(localStorage.getItem("userInfo"))
            // user.username = data?.username;
            // localStorage.setItem("userInfo", JSON.stringify(user));
        }
        catch (error)
        {
            toast.error(error.response.data.message);
        }
    }
}
