import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name: "profile",
    initialState:{
        profile: null,
        isProfileDeleted: false
    },
    reducers:{
        setProfile(state, action)
        {
            state.profile = action.payload;
        },
        setProfilePhoto(state, action)
        {
            state.profile.profilePhoto = action.payload;
        },
        updateProfile(state, action)
        {
            state.profile = action.payload;
        },
        setDeleted(state){
            state.isProfileDeleted = true;
        },
        clearDeleted(state){
            state.isProfileDeleted = false;
        }
    }
})



const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileActions, profileReducer}