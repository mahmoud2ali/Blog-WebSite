import "./profile.css"
// import profileImage from "../../images/user-avatar.png"
import PostList from "../../components/post/PostList";
import { posts } from "../../dummyData";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import {useDispatch, useSelector} from "react-redux"
import { getUserProfile, uploadProfilePhoto} from "../../redux/apiCalls/profileApiCall";

const Profile = () => {
   
    const dispatch = useDispatch();
    const {profile} = useSelector(state => state.profile)
    const {id} = useParams();

    const filterdPosts = posts.filter(post => post.user._id === id.toString());

    const [image, setImage] = useState(null)

    const[updateProfile, setUpdateProfile] = useState(false);


    useEffect(()=> {
        dispatch(getUserProfile(id));
    }, [id]);

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

    return ( 
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image">

                    <label className="profile-image-update" for={"updateImage"} > 
                      <img src={image? URL.createObjectURL(image) : profile?.profilePhoto.url} />
                      <i class="bi bi-camera"></i>
                    </label>

                    <div className="profile-data">
                        <h4>{profile?.username}</h4>
                        <div className="user-date-join">
                            <p>Joind At: <span>{new Date(profile?.createdAt).toDateString()}</span> </p>
                        </div>
                        <p className="user-bio">{profile?.bio}</p>
                </div>
                </div>
            </div>
            <div className="profile-footer">
                <form onSubmit={(e)=>updatPhotoHandler(e)}>
                    {/* <label for={"updateImage"} htmlFor="file" className="">
                        Clik On Image To Update
                    </label> */}
                    <input className="input-image" type="file" id="updateImage" name="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    <button type="submit" className="upload-profile-photo-btn"> Update Image </button>
                </form>
                <button onClick={()=>setUpdateProfile(true)} className="profile-update-btn">
                        Update Profile
                </button>

                <button className="profile-delete-btn">
                        Delete Your Account
                </button>
            </div>
            
            <div className="profile-posts-list">
                <h2>{profile?.username}'s posts</h2>
                <PostList posts={posts} />
            </div>

            {updateProfile && (
                <UpdateProfileModal profile={profile} setUpdateUser={setUpdateProfile} />
            )}

            {/* <UpdateProfileModal setUpdateUser={true} /> */}
        </section>
     );
}
 
export default Profile;