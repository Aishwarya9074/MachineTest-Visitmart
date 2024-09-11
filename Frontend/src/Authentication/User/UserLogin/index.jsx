import { useState } from "react";
import "./userlogin.css";
import axios from "../../../utils/axios";
import { savecreds } from "../../../utils/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserLogin = () => {
    const [login, setLogin] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const loginChange = (e, key) => {
        setLogin({ ...login, [key]: e.target.value });
    };

    const loginClick = async () => {
        try {
            const response = await axios.post('/user/login', login);
            savecreds(response.data.token);
            console.log(response.data);
            navigate('/product'); 
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className="user-login">
            <div className="login-card">
                <h1>Login</h1>
                
                <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => loginChange(e, 'username')}
                />
              
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => loginChange(e, 'password')}
                />
                <button onClick={loginClick}>Login</button>
                <div className="register-link">
                    <p>Don't have an account?</p>
                    <Link to="/user/signup">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
