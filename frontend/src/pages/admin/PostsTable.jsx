import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css"
import "./adminPage.css"
import Swal from "sweetalert2";
// import { posts } from "../../dummyData";
import { useEffect } from "react";
import {fetchPosts, deletePost } from "../../redux/apiCalls/postApiCall"
import { useSelector, useDispatch } from "react-redux";

const PostsTable = () => {

    const { posts }= useSelector(state => state.post);
    // console.log("home page Posts",posts)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchPosts());
    },[dispatch])
    console.log("in use effect ", posts);


    const deletPostHandler = (postId)=> {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePost(postId))
              Swal.fire({
                title: "Deleted!",
                text: "Post has been deleted.",
                icon: "success"
              });
            }
          });
    }


    return ( 
        <div>
            <div className="admin-dashboard-page">

                <AdminSidebar  />

                <div className="admin-main">
                    
                    <AdminHeader />

                    <div className="admin-page-line"></div>



                    <div className="admin-container-page">
                        
                            <div className="admin-table">
                                {/* <div className="table-title">Users</div> */}
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Count</th>
                                            <th>User</th>
                                            <th>Post Title</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts?.map(
                                            (item, index) => (
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="table-image">
                                                            <img src={item.user?.profilePhoto?.url}  className="table-user-img"/>
                                                            <span className="table-username">{item.user.username}</span>
                                                        </div>
                                                    </td>
                                                    <td>{item.title}</td>
                                                    <td>
                                                        <div className="table-btn-group">
                                                            <button>
                                                                <Link className="table-btn" to={`/posts/details/${item._id}`}>View Post</Link>
                                                            </button>
                                                            <button onClick={()=>deletPostHandler(item._id)}>
                                                                Delete Post
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                    </div>

                
                </div>
            </div>
        </div>
    );
}
 
export default PostsTable;