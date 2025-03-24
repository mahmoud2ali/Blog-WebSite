import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { toggleLikeHome } from "../../redux/apiCalls/postApiCall";

const Post = ({post, username, userId})=> {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const profileLink = userId ?  `/profile/${userId}` : `/profile/${post?.user?._id}`

    return (
        <div className="post-item">
            <div className="left">
                <img src={post?.image?.url} alt="postImage" />   
            </div>

            <div className="right">

                <div className="about">
                    <Link className="about-user" to={profileLink}>
                        {/* <div>
                            {post?.user?.profilePhoto?.url && <img className="userImage" src={post?.user?.profilePhoto?.url} alt="profile" /> }
                        </div> */}
                        <div className="userName">
                            {username ? username : post?.user.username}
                        </div>
                    </Link>

                    <div>{new Date(post?.createdAt).toDateString()}</div>
                </div>

                <div className="title">{post?.title}</div>

                <div className="desc-item">            
                    <div className="description">{post?.description}</div>
                    <Link className="-Link" to={`/posts/details/${post?._id}`}>Reading...</Link>
                </div>
        
                <div className="post-footer">
                
                    <div className="footer-content">
                        <Link className="-Link" to={`/posts/categories/${post?.category}`}>{post?.category}</Link>
                        <div style={{display: "flex", gap: "5px"}}>
                            {post?.likes.length} 
                            <i style={{cursor: "pointer"}} 
                                className={
                                post?.likes?.includes(user?._id) ? 
                                "bi bi-heart-fill" :
                                "bi bi-heart"} 
                                onClick={()=> user && dispatch(toggleLikeHome(post?._id))}>
                                </i>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Post;