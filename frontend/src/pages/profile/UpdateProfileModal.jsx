import { useState } from "react";
import "./updateUsermodal.css"
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/apiCalls/profileApiCall"; 


const UpdateProfileModal = ({setUpdateUser, profile}) => {

    const[username, setUserName] = useState(profile.username)
    const[bio, setBio] = useState(profile.bio);
    const[password, setPassword] = useState("");
  
    const dispatch = useDispatch();

    const updateUser = (e)=>{
        e.preventDefault();

        // console.log(profile);
        const update_user = {username, bio};
        
        if(password.trim() !== "")
        {
            update_user.password = password;
        }

        dispatch(updateUserProfile(profile?._id, update_user));
        setUpdateUser(false);
    }
    
    return ( 
        <div className={`user-form`}>
                <div className="header-form">
                    <div className="header-title">Update Profile</div>
                    <i onClick={()=>setUpdateUser(false)} className="bi bi-x-circle"></i>
                </div>
                    <form onSubmit={(e)=> updateUser(e) }>
                        <label for="userName">User Name</label>
                        <input type="text"  id="userName"
                            value={username}
                            onChange={(e)=>{setUserName(e.target.value)}}
                        />

                        <label for="bio">bio</label>
                        <input 
                            id="bio"
                            value={bio}
                            onChange={(e)=>{setBio(e.target.value)}}
                            >
                        </input>

                        <label for="password">password</label>
                        <input 
                            id="password"
                            value={password}
                            onChange={(e)=>{setPassword (e.target.value)}}
                            >
                        </input>

                        <button className="update-profile-btn" type="submit">Update</button>
                    </form>
                </div>
     );
}
 
export default UpdateProfileModal;