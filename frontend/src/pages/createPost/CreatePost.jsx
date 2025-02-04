import HomeImage from "../../components/homeImage/HomeImage";
import Slogan from "../../components/slogan/slogan";
import "./createPost.css"
import postImage from "../../images/postImage.avif";
import { useState } from "react";
const CreatePostPage = ()=>{
   
    const [title, setTitle] = useState("")
    const [descreption, setDescreption] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")   
   
    function CreatePost(e){
        e.preventDefault();
        console.log(title, descreption,category,image)
    }

    return (
        <div>
            <Slogan />
            <div className="create-post-form">
                <div className="post-form-left">
                    <img src={postImage}/>
                </div>
                <div className="post-form-right">
                    <div className="post-form-title">Create New Post</div>
                    <form onSubmit={(e)=>CreatePost(e)}>
                        <label for="postTitle">Post Title</label>
                        <input onChange={(e)=>setTitle(e.target.value)} type="text"  id="Post Title"/>

                        <label for="postDescription">Post Description</label>
                        <input onChange={(e)=>setDescreption(e.target.value)}
                            id="Post Description">
                        </input>
                        <label for="postCategory">Post Category</label>
                        <select onChange={(e)=>setCategory(e.target.value)}>
                            {/* <option disabled value="">
                                Select A Category
                            </option> */}
                            <option value="music">music</option>
                            <option value="travilling">travilling</option>
                            <option value="programming">programming</option>
                            <option value="cars">cars</option>
                            <option value="coffee & tea">coffee & tea</option>
                            <option value="nature">nature</option>
                            <option value="movies">movies</option>
                        </select> 
                        <label for="postImage">Post Image</label>
                        <input onChange={(e)=>setImage(e.target.value)} id="postImage" type="file"  name="file"/>
                        <button className="create-post-btn" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
   );
}

export default CreatePostPage