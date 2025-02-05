import { Link } from "react-router-dom";

const Post = ({post})=> {
    return (
        <div className="post-item">


            <div className="left">
                <img src={post.image} alt="postImage" />   
            </div>

            <div className="right">

                <div className="about">
                    <Link to={"/profile/1"}>
                        <div className="userName">
                            {post.user.username}
                        </div>
                        {/* <div>
                            {post.user.image}
                        </div> */}
                    </Link>

                    <div>{new Date(post.createdAt).toDateString()}</div>
                </div>

                <div className="title">{post.title}</div>

                <div className="desc-item">            
                    <div className="description">{post.description}</div>
                    <Link className="-Link" to={`/posts/details/${post._id}`}>Reading...</Link>
                </div>
        
                <div className="post-footer">
                    <div className="footer-content">
                        <Link className="-Link" to={`/posts/categories/${post.category}`}>{post.category}</Link>
                        <div>{post.likes.length} <i class="bi bi-heart"></i></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post;