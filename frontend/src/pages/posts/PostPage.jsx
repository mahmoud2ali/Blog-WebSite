import Categories from "../../components/categories/Categories";
import PostList from "../../components/post/PostList";
import Slogan from "../../components/slogan/slogan";
import {posts} from "../../dummyData"
import { categories } from "../../dummyData";
const PostsPage = ()=>{
    return (
         <div>
            <Slogan />
            <Categories categories={categories} />
            <PostList posts={posts} />
         </div>
    );
}

export default PostsPage