import { useState } from "react";
import { Link } from "react-router-dom"
import "./header.css"
const Header = () => {
    
    const [toggle, steToggle] = useState(false)
    
    return (
        <header className="header">
            <div className="header-left">
                <div className="header-logo">
                    <strong>EchoVerse</strong>
                    {/* <i className="bi bi-pencil"></i> */}
                </div>
                <div className="header-menu" onClick={()=> steToggle(prev => !prev)}>
                    <i class="bi bi-list"></i>
                </div>
            </div>
            <div className="links-parent">
                <nav style={{clipPath: toggle && "polygon(0 0 , 100% 0, 100% 100% , 0 100%)"}} className="navbar">
                    <ul className="nav-links">
                    {/*<li className="nav-link"><i className="bi bi-house"></i> Home</li>
                        <li className="nav-link"><i className="bi bi-stickies"></i> Posts</li>
                        <li className="nav-link"><i className="bi bi-journal-plus"></i> Create</li>
                        <li className="nav-link"><i className="bi bi-person-check"></i> Admin Dashboard</li> */}
                        <Link to={"/"} onClick={() =>steToggle(false)} className="nav-link">HOME</Link>
                        <Link to={"/posts"} onClick={() =>steToggle(false)} className="nav-link">POSTS</Link>
                        <Link to={"/posts/create-post"} onClick={() =>steToggle(false)} className="nav-link">CREATE</Link>
                        <Link to={"/admin"} onClick={() =>steToggle(false)} className="nav-link">ADMIN DASHBOARD</Link>
                        {/* <button className="nav-link">LOGIN</button>
                        <button className="nav-link">REGISTER</button> */}
                    </ul>

                </nav>
                <div className="header-right">
                    <Link to={"/login"} className="header-right-link btn">
                        {/* <i className="bi bi-box-arrow-in-right"></i> */}
                        LOGIN
                    </Link>
                    <Link to={"/register"} className="header-right-link btn">
                        {/* <i className="bi bi-person-plus"></i> */}
                        REGISTER
                    </Link>
                </div>
            </div>
        </header>
    );
}
 
export default Header;