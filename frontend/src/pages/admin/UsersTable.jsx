import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css"
import "./adminPage.css"
const UsersTable = () => {
    return ( 
        <div>



            <div className="admin-dashboard-page">
                <AdminSidebar  />

                <div className="admin-main">
                    
                    <AdminHeader />

                    <div className="admin-page-line"></div>



                    <div className="admin-container-page">
                        </div>
                        <div className="admin-table">
                            <div className="table-title">Users</div>
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
                                                    <div>
                                                        <img src="/images/user-avatar.png"  className="table-user-img"/>
                                                        <span className="table-username">Mahmoud Mohamed</span>
                                                    </div>
                                                </td>
                                                <td>mahmoud@email.com</td>
                                                <td>
                                                    <div className="table-btn-group">
                                                        <button>
                                                            <Link to={"/profile/1"}>View Profile</Link>
                                                        </button>
                                                        <button>
                                                            <Link to={"/profile/1"}>Delete User</Link>
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
     );
}
 
export default UsersTable;