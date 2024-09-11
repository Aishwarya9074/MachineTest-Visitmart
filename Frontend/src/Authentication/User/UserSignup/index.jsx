import { useState } from "react";
import "./usersign.css";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
    const [signup, setSignup] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const lognavigate=useNavigate()

    const signChange = (e, key) => {
        setSignup({ ...signup, [key]: e.target.value });
    };

    const signClick = async () => {
        if (signup.password !== signup.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/user/signup', signup);
            console.log(response.data);
            setError(''); 
            lognavigate('/user/login')
        } catch (error) {
            setError('Signup failed. Please try again.');
            console.error('Signup error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="user-signup">
            <div className="signup-card">
                <h1>Sign Up</h1>
                
                <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => signChange(e, 'username')}
                />
                
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => signChange(e, 'email')}
                />
               
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => signChange(e, 'password')}
                />
                
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    onChange={(e) => signChange(e, 'confirmPassword')}
                />
                {error && <div className="error-message">{error}</div>}
                <button onClick={signClick}>Sign Up</button>
            </div>
        </div>
    );
};

export default UserSignup;
