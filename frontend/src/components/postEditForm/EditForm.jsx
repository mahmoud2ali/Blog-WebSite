import { useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./editForm.css"
import {useDispatch, useSelector} from "react-redux";
import {updatePost, updatePostImage} from "../../redux/apiCalls/postApiCall"
import { fetchCatigories } from "../../redux/apiCalls/catigoryApiCall";


const EditForm = ({show}) => {
   

    const post = useSelector(state => state.post.singlePost);
  
  
    const {catigories} = useSelector(state => state.catigory)

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)

    // console.log(post)

    const {loading} = useSelector(state => state.post);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const updatePostHandler = (e)=>{
        e.preventDefault();
    
        const formData = new FormData();
        if(image != null)
        {
            console.log("update image");
            formData.append("image", image);
            dispatch(updatePostImage(post?._id ,formData));
            // console.log("image Updated successfully")
            setTimeout(() => {
            }, 3000);
        }

        const newPost = {
            title: title || post?.title,
            description: description || post?.description,   
            category: category || post?.category,
        }

        dispatch(updatePost(post?._id, newPost));

        setTimeout(() => {
            navigate('/');
        }, 2000);

    }
   
    useEffect(()=>{
        dispatch(fetchCatigories());
        console.log("catigories in edit post page")
        console.log(catigories);
    },[dispatch])


    return ( 
        <div className={`post-form-down show`} style={{clipPath: show && "polygon(0 0 , 100% 0, 100% 100% , 0 100%)", opacity: show? 1 : 0}}>
                    <div className="post-form-title">Update Post</div>
                    <form>
                        <label for="postTitle">Post Title</label>
                        <input type="text"  id="Post Title"
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />
                        <label for="postDescription">Post Description</label>
                        <input 
                            id="Post Description"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            >
                        </input>

                        <label for="postCategory">Post Category</label>
                        <select                        
                            value={category}
                            onChange={(e)=>{setCategory(e.target.value)}}>
                            <option disabled value={category}>
                                Category
                            </option>
                            {
                                catigories?.map(item =>(
                                    <option key={item._id} value={item.title}>{item.title}</option>
                                ))
                            }
                            
                            {/* <option value="travilling">travilling</option>
                            <option value="programming">programming</option>
                            <option value="cars">cars</option>
                            <option value="coffee & tea">coffee & tea</option>
                            <option value="nature">nature</option>
                            <option value="movies">movies</option> */}
                        </select> 
                        <label for="postImage">Post Image</label>
                        <input  id="postImage" type="file" name="file" 
                            onChange={(e)=>{setImage(e.target.files[0])}}
                        />
                        <button className="create-post-btn" type="submit" onClick={(e) => updatePostHandler(e)}>{loading? "loading...": "Update"}</button>
                    </form>
                </div>
     );
}
 
export default EditForm;