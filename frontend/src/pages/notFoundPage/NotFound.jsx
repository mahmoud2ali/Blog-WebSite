import { Link } from "react-router-dom";
import "./notFound.css"
const NotFound = () => {
    return (  
        <div className="not-found">
            <div className="not-found-title">404</div>
            <h1 className="not-found-text">page not found</h1>
            <Link className="not-found-link" to={"/"}>Go to home page</Link>
        </div>
    );
}
 
export default NotFound;