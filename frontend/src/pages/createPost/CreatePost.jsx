import HomeImage from "../../components/homeImage/HomeImage";
import Slogan from "../../components/slogan/slogan";
import "./createPost.css"
import postImage from "../../images/postImage.avif";
import { useState } from "react";
import {toast, ToastContainer} from "react-toastify"

const CreatePostPage = ()=>{
   
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
   
    const CreatePost = (e)=> {
        e.preventDefault();

        if(title.trim()=== "")
            return toast.error("post title is required");
        if(description.trim()=== "")
            return toast.error("post description is required");
        if(category.trim()=== "")
            return toast.error("post category is required");
        if(!image)
            return toast.error("post image is required");


        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);

       console.log(formData);
    }

    return (
        <div>
            <ToastContainer />
            <Slogan />
            <div className="create-post-form">
                <div className="post-form-left">
                    <img src={postImage}/>
                </div>
                <div className="post-form-right">
                    <div className="post-form-title">Create New Post</div>
                    <form onSubmit={CreatePost}>
                        <label for="postTitle">Post Title</label>
                        <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text"  id="Post Title"/>

                        <label for="postDescription">Post Description</label>
                        <input onChange={(e)=>setdescription(e.target.value)} value={description}
                            id="Post Description">
                        </input>

                        <label for="postCategory">Post Category</label>
                        <select onChange={(e)=>setCategory(e.target.value)} value={category}>
                            <option disabled value="">
                                Category
                            </option>
                            <option value="music">music</option>
                            <option value="travilling">travilling</option>
                            <option value="programming">programming</option>
                            <option value="cars">cars</option>
                            <option value="coffee & tea">coffee & tea</option>
                            <option value="nature">nature</option>
                            <option value="movies">movies</option>
                        </select> 
                        <label for="postImage">Post Image</label>
                        <input onChange={(e)=>setImage(e.target.files[0])} id="postImage" type="file"  name="file"/>
                        <button className="create-post-btn" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
   );
}

export default CreatePostPage