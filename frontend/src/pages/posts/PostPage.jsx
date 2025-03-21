import Categories from "../../components/categories/Categories";
import PostList from "../../components/post/PostList";
import Slogan from "../../components/slogan/slogan";
// import {posts} from "../../dummyData"
// import { categories } from "../../dummyData";
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react";
import {fetchPosts } from "../../redux/apiCalls/postApiCall"

const PostsPage = ()=>{

    const { posts }= useSelector(state => state.post);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchPosts());
    },[dispatch])
    // console.log("in use effect ", posts)
    return (
         <div>
            <Slogan />
            <Categories />
            <PostList posts={posts} />
         </div>
    );
}

export default PostsPage