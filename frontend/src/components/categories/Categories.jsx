import "./style.css"
import { Link } from "react-router-dom";
import { fetchCatigories } from "../../redux/apiCalls/catigoryApiCall";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Categories = () => {

    const {catigories} = useSelector(state => state.catigory)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCatigories());
        // console.log("catigories in catigories component")
        // console.log(catigories);
    },[])

    return (
        <div className="category-links">
            <Link className="categoryLink" to={"/posts"}>All posts</Link>
            {catigories?.map(category => 
                <Link className="categoryLink" key={category._id} 
                to={`/posts/categories/${category.title}`}>
                {category.title}
                </Link>
            )}
        </div>
    )
}

export default Categories;