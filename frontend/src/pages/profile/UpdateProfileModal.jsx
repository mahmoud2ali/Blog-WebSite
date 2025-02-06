import { useState } from "react";
import "./updateUsermodal.css"
const user = {
    username: "Mahmoud Mohamed",
    bio: "hello my name is mahmoud, I'm a web developer"
}
const UpdateProfileModal = ({setUpdateUser}) => {

    const[userName, setUserName] = useState(user.username)
    const[bio, setBio] = useState(user.bio);
    const[password, setPassword] = useState("");

    const updateUser = (e)=>{
        e.preventDefault();

        const updatedUser = {userName, bio};
        
        if(password.trim() !== "")
        {
            updateUser.password = password;
        }

        console.log(updatedUser);
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
                            value={userName}
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