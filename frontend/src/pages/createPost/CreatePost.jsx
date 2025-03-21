import HomeImage from "../../components/homeImage/HomeImage";
import Slogan from "../../components/slogan/slogan";
import "./createPost.css"
import postImage from "../../images/postImage.avif";
import { useState, useEffect } from "react";
import {toast, ToastContainer} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import {createPost} from "../../redux/apiCalls/postApiCall"
import {useNavigate} from "react-router-dom";
import { Triangle } from 'react-loader-spinner'
import { fetchCatigories } from "../../redux/apiCalls/catigoryApiCall";


const CreatePostPage = ()=>{
   
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
   
    const {loading, isCreated} = useSelector(state => state.post);
    const {catigories} = useSelector(state => state.catigory)

    const dispatch = useDispatch();
    const navigator = useNavigate();
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
        dispatch(createPost(formData))
    }
    console.log(isCreated, loading)
    useEffect(()=>{
        dispatch(fetchCatigories());
        console.log("create post page fetch catigories...")
        if(isCreated)
        {
            navigator('/');
        }
    }, [isCreated, navigator])

  

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
                            {
                                catigories?.map(item => (
                                    <option key={item._id} value={item.title}>{item.title}</option>
                                ))
                            }
                        </select> 
                        <label for="postImage">Post Image</label>
                        <input onChange={(e)=>setImage(e.target.files[0])} id="postImage" type="file"  name="file"/>
                        <div className="form-btn-div" >
                            {loading ?  
                                <Triangle
                                visible={loading}
                                height="50"
                                width="50"
                                color="#555"
                                ariaLabel="triangle-loading"
                                wrapperStyle={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                                wrapperClass=""
                                /> 
                                : <button type="submit" className="create-post-btn">Create</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
   );
}

export default CreatePostPage