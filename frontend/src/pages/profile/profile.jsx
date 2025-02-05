import "./profile.css"
import profileImage from "../../images/user-avatar.png"
import PostList from "../../components/post/PostList";
import { posts } from "../../dummyData";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
const Profile = () => {
   

    const {id} = useParams();

    const filterdPosts = posts.filter(post => post.user._id === id.toString());

    const [image, setImage] = useState(null)

    const updatPhotoHandler = (e)=>{
        e.preventDefault();
        if(!image)
        {
            return toast.warning("Click on you profile photo to add new one");
        }

        toast.success("Updated successfully")
    }

    return ( 
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image">

                    <label className="profile-image-update" for={"updateImage"} > 
                      <img src={profileImage} />
                      <i class="bi bi-camera"></i>
                    </label>

                    <div className="profile-data">
                        <h4>Mahmoud Mohamed</h4>
                        <div className="user-date-join">
                            <p>Joind At: <span>Fri Nov 04 2025</span> </p>
                        </div>
                        <p className="user-bio">hello my name is Mahmoud, I am a web developer</p>
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
                <button className="profile-update-btn">
                        Update Profile
                </button>

                <button className="profile-delete-btn">
                        Delete Your Account
                </button>
                
            </div>
            
            <div className="profile-posts-list">
                <h2>Latest Posts</h2>
                <PostList posts={posts} />
            </div>
        </section>
     );
}
 
export default Profile;