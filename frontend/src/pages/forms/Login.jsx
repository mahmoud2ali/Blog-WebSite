import { Link } from "react-router-dom";
import "./form.css"
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = ()=>{

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const dispatch = useDispatch();

    const registerHandler = (e)=> {
        e.preventDefault();

        if(email.trim() === "" || password.trim() === "")
        {
            return toast.error("Complete you data");
        }
        
        // toast.success("Logged in successfully");
        dispatch(loginUser({email, password}))
    }

    return (
        <div className="-form-container">
            <form className="-form" onSubmit={(e) => registerHandler(e)}>
                <div className="form-header">Login</div>
                <div className="form-body">
                    
                    <label for="email">email</label>
                    <input id="email" type="email" 
                        value={email} 
                        onChange={(e) => SetEmail(e.target.value)}
                    />

                    
                    <label for="password">password</label>
                    <input id="password" type="password"
                    value={password} 
                    onChange={(e) => SetPassword(e.target.value)} 
                    />

                    <button className="form-btn" type="submit">Login</button>
                </div>

                <div className="form-footer">
                    <p>Did you forgot you password?<span><Link className="form-footer-link" to={"/forgot-password"}>Forgot Password</Link></span></p>
                </div>
            </form>
        </div>
   );
}

export default Login