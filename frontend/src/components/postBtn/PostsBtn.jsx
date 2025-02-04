import { Link } from "react-router-dom"
import "./style.css"

const PostsBtn = ()=>{
    return(
        <div className="posts-btn-container">
            <Link className="posts-btn" to={"/posts"}>View All Posts</Link>
        </div>
    );
}

export default PostsBtn;
