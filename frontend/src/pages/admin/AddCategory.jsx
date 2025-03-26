import { useState } from "react";
import "./adminPage.css"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/catigoryApiCall";

const AddCategory = () => {
    
    const [title, setTitle] = useState("")
    const dispatch = useDispatch();

    const addCategoryHandler = (e)=> {
        e.preventDefault();
        
        if(title.trim() === "")
        {
            return toast.error("category title is required");   
        }

        dispatch(createCategory({ title }));

        toast.success(`"${title}" has been added successfully`);
    }

    return (
        <form className="add-category-form" onSubmit={(e) => addCategoryHandler(e)}>
                        <div className="category-form-title">Add new category</div>
                        <label className="category-title" for="category-title">Category Title</label>
                        <input id="category-title" type="text" 
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                        />
                        <button className="add-category-btn" type="submit">Add</button>   
                </form>
               
      );
}
 
export default AddCategory;