import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css"
import "./adminPage.css"
import Swal from "sweetalert2";

const UsersTable = () => {
        const deletUserHandler = ()=> {
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
                  Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
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
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1,2,3,4,5,6,7,8,9,10].map(
                                            item => (
                                                <tr key={item}>
                                                    <td>{item}</td>
                                                    <td>
                                                        <div className="table-image">
                                                            <img src="/images/user-avatar.png"  className="table-user-img"/>
                                                            <span className="table-username">Mahmoud Mohamed</span>
                                                        </div>
                                                    </td>
                                                    <td>mahmoud@email.com</td>
                                                    <td>
                                                        <div className="table-btn-group">
                                                            <button>
                                                                <Link className="table-btn" to={"/profile/1"}>View Profile</Link>
                                                            </button>
                                                            <button onClick={deletUserHandler}>
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