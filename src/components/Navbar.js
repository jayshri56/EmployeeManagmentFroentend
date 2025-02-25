import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userRole }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Employee Management System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            {userRole === 'Employee' && (
              <li className="nav-item">
                <Link className="nav-link" to="/leave-management">Leave Management</Link>
              </li>
            )}
            {(userRole === 'Admin' || userRole === 'HR') && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/employee-dashboard">Employee Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/performance-reviews">Performance Reviews</Link>
                </li>
              </>
            )}
             {userRole === 'Admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
