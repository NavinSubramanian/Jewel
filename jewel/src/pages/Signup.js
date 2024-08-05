import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Signup = () => {
  const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(600); // 10 minutes in seconds
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);

    useEffect(()=>{
        if(user != null){
            navigate('/')
        }
    },[])
    
    useEffect(() => {
        let interval;
        if (isOtpSent) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOtpSent]);

    const handleSignup = async (e) => {
        if(password == password2){
            e.preventDefault();
            setError('');
            try {
                const response = await axios.post('http://localhost:5000/signup', { email, password });
                if (response.data.success) {
                    setIsOtpSent(true);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data.message);
                } else {
                    setError('Failed to signup');
                }
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { email, otp, password });
            if (response.data.success) {
                alert('User verified and created successfully');
                navigate("/login")
                // Redirect or clear the form
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Failed to verify OTP');
            }
        }
    };

    const handleResendOtp = async () => {
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/resend-otp', { email });
            if (response.data.success) {
                setTimer(600); // Reset timer to 10 minutes
                setIsOtpSent(true);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Failed to resend OTP');
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className='mainLoginContainer'>
                <div className="left-side-signup"></div>
                <div className="right-side">
                    {!isOtpSent ? (
                        <form onSubmit={handleSignup} autocomplete="on">
                            <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <input type="password" placeholder="Re-Enter Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                            <button className='login-btn' type="submit">Sign Up</button>
                            {error && <p className="error-message">{error}</p>}
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp}>
                            <h2>Enter OTP</h2>
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                            <button className='login-btn' type="submit">Verify OTP</button>
                            <p>OTP is valid for {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                            <button type="button" onClick={handleResendOtp}>Resend OTP</button>
                            {error && <p className="error-message">{error}</p>}
                        </form>
                    )}
                    <div className="register">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Signup;
