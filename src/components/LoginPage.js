import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUserRole, setEmployeeId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Example login validation (replace with real authentication logic)
    if (username === 'employee' && password === 'password') {
      setUserRole('Employee');
      setEmployeeId(1); // Set the logged-in employee's ID
      localStorage.setItem('userRole', 'Employee');
      localStorage.setItem('employeeId', 1);
      navigate('/');
    } else if (username === 'admin' && password === 'password') {
      setUserRole('Admin');
      setEmployeeId(1); // Set the logged-in admin's ID
      localStorage.setItem('userRole', 'Admin');
      localStorage.setItem('employeeId', 1);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
