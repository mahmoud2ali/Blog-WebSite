import "./form.css"
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = ()=>{

    const [email, SetEmail] = useState("");



    const registerHandler = (e)=> {
        e.preventDefault();

        if(email.trim() === "")
        {
            return toast.error("Enter your email");
        }
        
        toast.success("Logged in successfully")
    }

    return (
        <div className="-form-container">
            <form className="-form" onSubmit={(e) => registerHandler(e)}>
                <div className="form-header">Forgot password</div>
                <div className="form-body">
                    
                    <label for="email">email</label>
                    <input id="email" type="email" 
                        value={email} 
                        onChange={(e) => SetEmail(e.target.value)}
                    />

                    <button className="form-btn" type="submit">Submit</button>
                </div>

                <div className="form-footer">

                    {/* <p>Did you forgot you password?<span><Link className="form-footer-link" to={"/forgot-password"}>Forgot Password</Link></span></p> */}
                </div>
            </form>
        </div>
   );
}

export default ForgotPassword