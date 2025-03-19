import Post from "./Post"
import "./post.css"
const PostList = ({posts})=> {
    console.log("postList", posts)

    return (
        <div className="post-list">
            {posts.map(item => <Post post={item} key={item._id} postKey = {item._id} />)}
        </div>
    ) 
}

export default PostList;