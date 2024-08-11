import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const nav = useNavigate();

    useEffect(()=>{
        if(user != null){
            nav('/')
        }
    },[])

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://jewelbackend.vercel.app/login', { email, password });

            if (response.data.success) {
                loginUser({ email, token: response.data.token });
                navigate('/profile'); // Navigate to profile page after successful login

                toast.success("Login Sucessfull", {
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.error("Login Error", {
                autoClose: 2000,
            });

            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Failed to login');
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className='mainLoginContainer'>
                <div className="left-side"></div>
                <div className="right-side">
                    <form onSubmit={handleLogin}>
                        <div className="btn-group">
                            <button className="btn">
                                <img className="logo" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d1c98974-c62d-4071-8bd2-ab859fc5f4e9" alt="Google logo" />
                                <span>Sign in with Google</span>
                            </button>
                            <button className="btn">
                                <img className="logo" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/59c1561b-8152-4d05-b617-0680a7629a0e" alt="Apple logo" />
                                <span>Sign in with Apple</span>
                            </button>
                        </div>
                        <div className="or">
                            <span>Or</span>
                        </div>
                        <input type="email" placeholder="Enter Mail Address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="on" name='email' required />
                        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="login-btn">Sign in</button>
                        <div className="register">
                            <p>Don't have an account? <Link to="/signup">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
