import { useState } from "react";
import "./adminPage.css"
import { toast } from "react-toastify";

const AddCategory = () => {
    
    const [category, SetCategory] = useState("")
    
    const addCategoryHandler = (e)=> {
        e.preventDefault();
        
        if(category.trim() === "")
        {
            return toast.error("category title is required");   
        }

        toast.success(`"${category}" has been added successfully`);
        }

    return (
        <form className="add-category-form" onSubmit={(e) => addCategoryHandler(e)}>
                        <div className="category-form-title">Add new category</div>
                        <label className="category-title" for="category-title">Category Title</label>
                        <input id="category-title" type="text" 
                            value={category}
                            onChange={(e) => {SetCategory(e.target.value)}}
                        />
                        <button className="add-category-btn" type="submit">Add</button>   
                </form>
               
      );
}
 
export default AddCategory;