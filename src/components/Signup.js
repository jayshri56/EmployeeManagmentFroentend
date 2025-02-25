import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/signup', userDetails)
      .then(response => {
        alert('Signup Successful');
      })
      .catch(error => {
        console.error('Error signing up:', error);
        alert('Signup failed');
      });
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          fullWidth
          className="mt-3"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userDetails.password}
          onChange={handleChange}
          fullWidth
          className="mt-3"
        />
        <Button type="submit" variant="contained" color="primary" className="mt-3">Signup</Button>
      </form>
    </div>
  );
};

export default Signup;
