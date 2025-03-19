import { useParams } from "react-router-dom";
import Slogan from "../../components/slogan/slogan";
import { categories, posts } from "../../dummyData";
import PostList from "../../components/post/PostList";
import Categories from "../../components/categories/Categories"
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import {fetchPosts} from "../../redux/apiCalls/postApiCall"


const CategoryPage = () => {
    
    const {category} = useParams(); 
    const [filterdPosts, SetFilteredPosts] = useState([]);


    const { posts }= useSelector(state => state.post);
    console.log("home page Posts",posts)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchPosts());
    },[dispatch])
    console.log("in use effect ", posts);

    useEffect(() => {
        dispatch(fetchPosts());
        const newFilterdPosts = posts.filter(post=> post.category.trim().toLowerCase() === category.toString().trim().toLowerCase());
        // const newFilterdPosts = []; 
        // posts.forEach(element => {
        //     if(element.category === category.toString())
        //     {
        //         newFilterdPosts.push(element);
        //     }
        // });
        SetFilteredPosts(newFilterdPosts);
    },[category])

    console.log("post category: ", filterdPosts);

    return (  
        <>
            <Slogan />
            {/* category page : {category} */}
            <Categories categories={categories}/>
            <PostList posts={filterdPosts} />
        </>
    );
}
 
export default CategoryPage;