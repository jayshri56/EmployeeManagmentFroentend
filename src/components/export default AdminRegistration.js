import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegistration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setMessage('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/admin/register', {
                username,
                email,
                password,
                confirmPassword,
                role: 'Admin',
            });
            setMessage('Admin registered successfully. Please log in.');
            navigate('/admin/login'); // Navigate to login after successful registration
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred during registration.');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Admin Registration</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/admin/login')}
                        style={{ cursor: 'pointer', color: 'blue' }}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AdminRegistration;
