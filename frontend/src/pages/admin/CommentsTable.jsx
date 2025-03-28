import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css"
import "./adminPage.css"
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteComment, fetchComments } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {


    const {comments} = useSelector(state => state.comment);
    
    const deletCommentHandler = (commentId)=> {
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
                dispatch(deleteComment(commentId))
              Swal.fire({
                title: "Deleted!",
                text: "Comment has been deleted.",
                icon: "success"
              });
            }
          });
    }
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchComments());    
    },[])

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
                                            <th>Comment</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comments?.map(
                                            (item, index) => (
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="table-image">
                                                            <img src={item.userId?.profilePhoto?.url} className="table-user-img"/>
                                                            <span className="table-username">{item.userId?.username} </span>
                                                        </div>
                                                    </td>
                                                    <td>{item.text}</td>
                                                    <td>
                                                        <div className="table-btn-group">
                                                            <button onClick={()=>deletCommentHandler(item._id)}>
                                                                Delete Comment
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
 
export default CommentsTable;