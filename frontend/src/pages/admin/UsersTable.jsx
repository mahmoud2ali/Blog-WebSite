import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css"
import "./adminPage.css"
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserProfile } from "../../redux/apiCalls/profileApiCall";

const UsersTable = () => {
        const deletUserHandler = (userId)=> {
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
                   dispatch(deleteUserProfile(userId));    
                  Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success"
                  });
                }
              });
        }

    const dispatch = useDispatch();
    const {users} = useSelector(state => state.profile)
    
    useEffect(()=>{
        dispatch(fetchUsers());
    })

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
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map(
                                            (item,index)=> (
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="table-image">
                                                            <img src={item.profilePhoto?.url}  className="table-user-img"/>
                                                            <span className="table-username">{item.username}</span>
                                                        </div>
                                                    </td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        <div className="table-btn-group">
                                                            <button>
                                                                <Link className="table-btn" to={`/profile/${item._id}`}>View Profile</Link>
                                                            </button>
                                                            <button onClick={()=>deletUserHandler(item._id)}>
                                                                Delete User
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
 
export default UsersTable;