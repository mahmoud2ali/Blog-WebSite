import "./style.css"
import { Link } from "react-router-dom";

const Categories = ({categories}) => {
    return (
        <div className="category-links">
            <Link className="categoryLink" to={"/posts"}>All posts</Link>
            {categories.map(category => 
                <Link className="categoryLink" key={category._id} 
                to={`/posts/categories/${category.title}`}>
                {category.title}
                </Link>
            )}
        </div>
    )
}

export default Categories;