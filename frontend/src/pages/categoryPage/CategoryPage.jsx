import { useParams } from "react-router-dom";
import Slogan from "../../components/slogan/slogan";
import { categories, posts } from "../../dummyData";
import PostList from "../../components/post/PostList";
import Categories from "../../components/categories/Categories"
import { useEffect, useState } from "react";
const CategoryPage = () => {
    
    const {category} = useParams(); 
    const [filterdPosts, SetFilteredPosts] = useState([]);

    useEffect(() => {
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