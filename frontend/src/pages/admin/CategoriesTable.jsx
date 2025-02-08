import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./adminTable.css"
import "./adminPage.css"
import Swal from "sweetalert2";
import { categories } from "../../dummyData";

const CategoriesTable = () => {
    const deletPostHandler = ()=> {
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
                text: "Category has been deleted.",
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
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(
                                            (item, index) => (
                                                <tr key={item}>
                                                    <td>{index + 1}</td>
                                                    {/* <td>
                                                        <div className="table-image">
                                                            <img src="/images/user-avatar.png"  className="table-user-img"/>
                                                            <span className="table-username">{item.user.username}</span>
                                                        </div>
                                                    </td> */}
                                                    <td>{item.title}</td>
                                                    <td>
                                                        <div className="table-btn-group">
                                                            {/* <button>
                                                                <Link className="table-btn" to={`/posts/details/${item._id}`}>View Post</Link>
                                                            </button> */}
                                                            <button onClick={deletPostHandler}>
                                                                Delete Category
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
 
export default CategoriesTable;