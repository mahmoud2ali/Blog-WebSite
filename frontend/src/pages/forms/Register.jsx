import { Link , useNavigate} from "react-router-dom";
import "./form.css"
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";

const RegisterPage = ()=>{


    const dispatch = useDispatch();
    const {registerMessage} = useSelector(state => state.auth)


    const navigate = useNavigate();

    const [username, SetUsername] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")


    const registerHandler = (e)=> {
        e.preventDefault();

        if(username.trim() === "" || email.trim() === "" || password.trim() === "")
        {
            return toast.error("Complete you data");
        }
        
        // toast.success("You registerd successfully");
        dispatch(registerUser({username, email, password}));        
    }
    
    // if(registerMessage)
    // {
    //     swal({
    //         title: registerMessage,
    //         icon: "success"
    //     }).then(isOk => {
    //         if(isOk)
    //         {
    //             navigate("/login");
    //         }
    //     })
    // }

    if(registerMessage)
    {        
        Swal.fire({
            // title: ":)",
            title: registerMessage,
            icon: "success",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login")
            }
        });
    }

    return (
        <div className="-form-container">
            <form className="-form" onSubmit={(e) => registerHandler(e)}>
                <div className="form-header">Create new account</div>
                <div className="form-body">
                    <label for="username">user name</label>
                    <input id="username" type="text"
                        value={username} 
                        onChange={(e) => SetUsername(e.target.value)}
                    />
                    
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

                    <button className="form-btn" type="submit">Register</button>
                </div>

                <div className="form-footer">
                    <p>Already have an account? <span><Link className="form-footer-link" to={"/login"}>Login</Link></span></p>
                </div>
            </form>
        </div>
   );
}

export default RegisterPage