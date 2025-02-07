import { Link } from "react-router-dom";
import "./adminPage.css"

const AdminSidebar = () => {
    return ( 
        <div className="admin-siedebar">
                <ul>
                    <li>
                        <Link className="sid-link" to="/admin-dashboard"><i class="bi bi-columns"></i> Dashboard</Link>
                    </li>

                    <li>
                        
                        <Link className="sid-link" to="/admin-dashboard/users-table"><i class="bi bi-people"></i> Users</Link>
                    </li>

                    <li>
                        <Link className="sid-link" to="/admin-dashboard/posts-table"><i class="bi bi-stickies"></i> Posts</Link>
                    </li>

                    <li>
                        <Link className="sid-link" to="/admin-dashboard/categories-table"><i class="bi bi-tag"></i> Categories</Link>
                    </li>

                    <li>
                        <Link className="sid-link" to="/admin-dashboard/comments-table"><i class="bi bi-card-text"></i> Comments</Link>
                    </li>

                </ul>

            </div>
     );
}
 
export default AdminSidebar;