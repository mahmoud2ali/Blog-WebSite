import { Link } from "react-router-dom";
import "./adminPage.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostsCount} from "../../redux/apiCalls/postApiCall"
const AdminHeader = () => {

    const {postsCount} = useSelector(state => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostsCount());
    }, [dispatch])
    console.log(postsCount)

    return ( 
        <div className="admin-main-header">  
                        
            <Link to={"/admin-dashboard/users-table"} className="admin-card">
                <div className="admin-card-title">Users</div>
                <div className="admin-card-count">120</div>
                {/* <div className="admin-card-link">see all users</div> */}
            </Link>


            <Link to={"/admin-dashboard/posts-table"} className="admin-card">
                <div className="admin-card-title">posts</div>
                <div className="admin-card-count">{postsCount}</div>
                {/* <div className="admin-card-link">see all posts</div> */}
            </Link>

            <Link to={"/admin-dashboard/comments-table"} className="admin-card">
                <div className="admin-card-title">comments</div>
                <div className="admin-card-count">1006</div>
                {/* <div className="admin-card-link">see all comments</div> */}
            </Link>

            <Link to={"/admin-dashboard/categories-table"} className="admin-card">
                <div className="admin-card-title">categories</div>
                <div className="admin-card-count">5</div>
                {/* <div  className="admin-card-link">see all categories</div> */}
            </Link>


        </div>
     );
}
 
export default AdminHeader;