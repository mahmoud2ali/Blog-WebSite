import { useState } from "react";
import { toast } from "react-toastify";
import "./editForm.css"

const EditForm = ({show}) => {
   
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")




    const updatePost = (e)=>{
        e.preventDefault();
       

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);


        console.log(formData)

        return toast.success("updated successfully")
    }
   
    return ( 
        <div className={`post-form-down show`} style={{clipPath: show && "polygon(0 0 , 100% 0, 100% 100% , 0 100%)", opacity: show? 1 : 0}}>
                    <div className="post-form-title">Update Post</div>
                    <form onSubmit={ updatePost }>
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
                        <input  id="postImage" type="file"  name="file" 
                            onChange={(e)=>{setTitle(e.target.files[0])}}
                        />
                        <button className="create-post-btn" type="submit">Update</button>
                    </form>
                </div>
     );
}
 
export default EditForm;