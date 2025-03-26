import "./profile.css"
// import profileImage from "../../images/user-avatar.png"
import PostList from "../../components/post/PostList";
// import { posts } from "../../dummyData";
import { useParams , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import {useDispatch, useSelector} from "react-redux"
import { deleteUserProfile, getUserProfile, uploadProfilePhoto} from "../../redux/apiCalls/profileApiCall";
import Post from "../../components/post/Post";
import Swal from "sweetalert2";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Profile = () => {
   
    const dispatch = useDispatch();
    const {profile} = useSelector(state => state.profile)
    const {id} = useParams();
    const {user} = useSelector(state => state.auth)
    const {isProfileDeleted} = useSelector(state => state.profile);
    // const filterdPosts = posts.filter(post => post.user._id === id.toString());

    const [image, setImage] = useState(null)

    const[updateProfile, setUpdateProfile] = useState(false);

    const navigate = useNavigate();


    
    const updatPhotoHandler = (e)=>{
        e.preventDefault();
        if(!image)
            {
                return toast.warning("Click on you profile photo to add new one");
            }
            
            const formData = new FormData();
            formData.append("image", image);
            
            dispatch(uploadProfilePhoto(formData));
            // toast.success("Updated successfully")
        }
        
        const handleDeleteProfile =(e)=>{
            e.preventDefault()
            Swal.fire({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover profile!",
                icon: "warning",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteUserProfile(user?._id));
                }
            });
    }
    
    useEffect(()=> {
        dispatch(getUserProfile(id));
        if(isProfileDeleted){
            dispatch(logoutUser())    
            navigate("/")
        }
    },[isProfileDeleted, dispatch, navigate]);

    return ( 
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image">

                    {
                        user?._id == id ? 
                        (
                            <label className="profile-image-update" for={"updateImage"} > 
                                <img src={image? URL.createObjectURL(image) : profile?.profilePhoto.url} />
                                <i class="bi bi-camera"></i>
                            </label>
                        ) : 
                        (
                            <label className="profile-image-update"> 
                                <img src={profile?.profilePhoto.url} />
                            </label>
                        )
                    }
                    <div className="profile-data">
                        <h4>{profile?.username}</h4>
                        <div className="user-date-join">
                            <p>Joind At: <span>{new Date(profile?.createdAt).toDateString()}</span> </p>
                        </div>
                        <p className="user-bio">{profile?.bio}</p>
                </div>
                </div>
            </div>
            {
                user?._id == id && 
                (<div className="profile-footer">
                    <form onSubmit={(e)=>updatPhotoHandler(e)}>
                        <input className="input-image" type="file" id="updateImage" name="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                        <button type="submit" className="upload-profile-photo-btn"> Update Image </button>
                    </form>
                    <button onClick={()=>setUpdateProfile(true)} className="profile-update-btn">
                            Update Profile
                    </button>

                    <button className="profile-delete-btn" onClick={(e)=> handleDeleteProfile(e)}>
                            Delete Your Account
                    </button>
                </div>)
            }
            
            <div className="profile-posts-list">
                <h2>{profile?.username}'s posts</h2>
                <div style={{width: "65%", margin: "auto"}}>
                    {
                        profile?.posts?.map(post=>(
                            <Post post={post} key={post._id} postKey={post._id}  username={profile?.username} userId={profile?._id} />
                        ))
                    }
                </div>
            </div>

            {updateProfile && (
                <UpdateProfileModal profile={profile} setUpdateUser={setUpdateProfile} />
            )}

            {/* <UpdateProfileModal setUpdateUser={true} /> */}
        </section>
     );
}
 
export default Profile;