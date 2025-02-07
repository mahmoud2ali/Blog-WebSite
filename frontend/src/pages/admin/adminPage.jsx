import { Link } from "react-router-dom";
import "./adminPage.css"
import AdminSidebar from "./AdminSidebar";
// import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AddCategory from "./AddCategory";
// import { ToastContainer } from "react-toastify";

const AdminPage = ()=>{
    

    return (
        <div className="admin-dashboard-page">
            <AdminSidebar  />

            <div className="admin-main">
                
                <AdminHeader />

                <div className="admin-page-line"></div>
                
                <AddCategory />
            </div>
        </div>
   );
}

export default AdminPage