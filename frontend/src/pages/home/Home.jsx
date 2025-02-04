import { Link } from "react-router-dom";
import HomeImage from "../../components/homeImage/HomeImage";
import PostList from "../../components/post/PostList";
import {posts} from "../../dummyData"
import PostsBtn from "../../components/postBtn/PostsBtn"

const HomePage = ()=>{
    return (
        <>
            <HomeImage/>
            <PostList  posts={posts.slice(0, 3)} />
            <PostsBtn />
        </>
   );
}

export default HomePage