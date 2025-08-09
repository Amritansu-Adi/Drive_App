import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import './Auth.css';
// import { useNavigate } from 'react-router-dom';

const Auth = ({ setToken }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        const url = isLogin ? '/auth/login' : '/auth/signup';
        const payload = isLogin ? { email, password } : { username, email, password };
        // const payload = isLogin ? { email, password } : { username, email, password, confirmPassword };
        
        try {
            const { data } = await axiosInstance.post(url, payload);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            // localStorage.setItem('user', JSON.stringify(data.user));
            setMessage(isLogin ? 'Login successful!' : 'Account created successfully!');
            setMessageType('success');
            // navigate('/dashboard');
        } catch (error) {
            console.error("Auth error", error.response?.data);
            setMessage(error.response?.data?.msg || 'An error occurred');
            // setMessage(error.response?.data?.message || error.message || 'Something went wrong');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="form-wrapper">
                <h2 className="form-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                {/* <h2 className="form-title">{isLogin ? 'Sign In' : 'Join Us'}</h2> */}
                
                {message && (
                    <div className={messageType === 'error' ? 'error-message' : 'success-message'}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                id="username"
                                type="text" 
                                placeholder="Enter your username" 
                                // placeholder="Choose a username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                // minLength="3"
                                // maxLength="20"
                            />
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        {/* <label htmlFor="email">Email</label> */}
                        <input 
                            id="email"
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            // autoComplete="email"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Enter your password" 
                            // placeholder="Password (min 6 chars)"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            // minLength="6"
                        />
                    </div>
                    
                    <button 
                        className={`submit-btn ${loading ? 'loading' : ''}`} 
                        type="submit"
                        disabled={loading}
                        // onClick={handleSubmit}
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                        {/* {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')} */}
                    </button>
                </form>
                
                <p className="toggle-text">

                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <a 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLogin(!isLogin);
                            setMessage('');
                            setUsername('');
                            setEmail('');
                            setPassword('');
                            // clearForm();
                        }} 
                        className="toggle-link"
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                        {/* {isLogin ? 'Register here' : 'Login here'} */}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Auth;
