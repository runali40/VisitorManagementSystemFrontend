import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UrlData from '../../../UrlData';
import { v4 as uuidv4 } from 'uuid';
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const headerCellStyle = {
        backgroundColor: "#f0bcb4",
        color: "#fff",
    };

    const LoginData = async () => {
        // if (disabled) return;

        if (!username || !password) {
            toast.warning("Please Enter Username and Password");
            return;
        }

        const sessionId = uuidv4();
        const data = {
            username: username,
            password: password,
            IpAddress: "192.168.1.4",
            // ipAddress:"192.168.1.2",
            SessionId: sessionId,
        };

        try {
            const response = await axios.post(new URL(UrlData + 'Auth'), data);
            const result = response.data.result;
            console.log(result.data, "92")
            // Store user data in localStorage
            const roleId = result.data.r_id;
            localStorage.setItem("RoleId", roleId);
            localStorage.setItem("userId", result.data.UserId);
            localStorage.setItem("sessionid", result.outcome.sessionId);
            localStorage.setItem("username", result.data.um_user_name);
            localStorage.setItem("RoleName", result.data.r_rolename);

            // Set token in cookies
            Cookies.set("UserCredential", result.outcome.tokens, { expires: 7 });
            // Cookies.remove("UserCredential", { path: '/' });
            navigate("/dashboard", { replace: true });
        } catch (error) {
            const errorMessage = error.response?.status === 400
                ? "Username and Password both are Invalid!"
                : "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            //   setDisabled(false);
        }
    };

    return (
        <>
            <div className="log-w3">

                <div className="w3layouts-main">
                    <h2>Sign In Now</h2>
                    <div>
                        <input type="text" className="ggg" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {/* <input type="password" className="ggg" name="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                        <div style={{ position: 'relative', width: '100%' }}><input
                            type={showPassword ? 'text' : 'password'}
                            className="ggg"
                            name="Password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', paddingRight: '40px' }}
                        />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '-94px',
                                    top: '39%',
                                    color: "black",
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer'
                                }}
                            >
                                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                            </span></div>

                        {/* <span><input type="checkbox" />Remember Me</span> */}
                        {/* <h6><a href="#">Forgot Password?</a></h6> */}
                        <div className="clearfix"></div>
                        {/* <NavLink to="/dashboard"><input type="submit" value="Sign In" name="login" /></NavLink> */}
                        <div className="text-center mt-3">
                            <button className='btn' style={headerCellStyle} onClick={LoginData}>
                                Login
                            </button>
                        </div>
                    </div>
                    {/* <p>Don't Have an Account ?<NavLink to="/registration">Create an account</NavLink></p> */}
                </div>

            </div>
        </>
    )
}

export default Login