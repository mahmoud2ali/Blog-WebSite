import { Link } from "react-router-dom";
import HomeImage from "../../components/homeImage/HomeImage";
import PostList from "../../components/post/PostList";
// import {posts} from "../../dummyData"
import PostsBtn from "../../components/postBtn/PostsBtn"
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react";
import {fetchPosts } from "../../redux/apiCalls/postApiCall"


const HomePage = ()=>{

    const { posts }= useSelector(state => state.post);
    // console.log("home page Posts",posts)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchPosts());
    },[dispatch])
    console.log("in use effect ", posts);


    return (
        <>
            <HomeImage/>
            {/* <PostList  posts={posts.slice(0, 3)} />
             */}
             {posts.length === 0 ? <div>Loading...</div> :  <PostList  posts={posts.slice(0, 3)} />}

     
            <PostsBtn />
        </>
   );
}

export default HomePage