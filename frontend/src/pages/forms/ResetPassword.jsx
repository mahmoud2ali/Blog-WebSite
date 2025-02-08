import "./form.css"
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = ()=>{

    const [password, SetPassword] = useState("");


    const registerHandler = (e)=> {
        e.preventDefault();

        if(password.trim() === "")
        {
            return toast.error("Enter your new password");
        }
        
        toast.success("Logged in successfully")
    }

    return (
        <div className="-form-container">
            <form className="-form" onSubmit={(e) => registerHandler(e)}>
                <div className="form-header">Reset password</div>
                <div className="form-body">
                
                    
                    <label for="password">new password</label>
                    <input id="password" type="password"
                    value={password} 
                    onChange={(e) => SetPassword(e.target.value)} 
                    />

                    <button className="form-btn" type="submit">submit</button>
                </div>

                <div className="form-footer">
                    {/* <p>Did you forgot you password?<span><Link className="form-footer-link" to={"/forgot-password"}>Forgot Password</Link></span></p> */}
                </div>
            </form>
        </div>
   );
}

export default ResetPassword