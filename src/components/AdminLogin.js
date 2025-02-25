import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from 'react-bootstrap';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role] = useState('Admin');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        if (!username || !password) {
            setMessage('Please enter both username and password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('username', username); // Store username

            resetForm();
            alert('Admin logged in successfully!');
            console.log("login response :", data)
            console.log("User Role:", data.role);

            navigate(data.role === "Admin" ? "/admin/dashboard" : "/");
        } catch (error) {
            setMessage(error.message || 'An error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!username || !email || !password || !confirmPassword) {
            setMessage('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/admin/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, confirmPassword, role })
            });

            if (!response.ok) {
                throw new Error('Registration failed.');
            }

            setMessage('Admin registered successfully. Please log in.');
            setIsRegistering(false);
            resetForm();
        } catch (error) {
            setMessage(error.message || 'An error occurred during registration.');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">{isRegistering ? 'Admin Registration' : 'Admin Login'}</h2>
                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={isRegistering ? handleRegister : handleLogin}>
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
                    {isRegistering && (
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
                    )}
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
                    {isRegistering && (
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
                    )}

                    <button type="submit" className="btn btn-primary w-100">
                        {isLoading ? <Spinner animation="border" size="sm" /> : (isRegistering ? 'Register' : 'Login')}
                    </button>
                </form>

                <p className="mt-3 text-center">
                    {isRegistering ? (
                        <span>
                            Already have an account?{' '}
                            <span
                                onClick={() => setIsRegistering(false)}
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                Login here
                            </span>
                        </span>
                    ) : (
                        <span>
                            Don't have an account?{' '}
                            {/* <span
                                onClick={() => setIsRegistering(true)}
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                Register here
                            </span> */}

                            <span
                                onClick={() => navigate('/admin/register')} // Navigate to Admin Registration
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                Register here
                            </span>


                        </span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
