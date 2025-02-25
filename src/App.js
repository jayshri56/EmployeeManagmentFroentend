import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing components
import HRDashboard from './components/HRDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import MyNavbar from './components/MyNavbar ';

import AdminRegistrationPage from './components/pages/AdminRegistrationPage ';
import EmployeeList from './components/EmployeeList';
import EmployeeProfile from './components/EmployeeProfile';
import RegisterEmployee from './components/RegisterEmployee';
import AdminLogin from './components/AdminLogin';
import AdminRegistration from './components/AdminRegistration';
import EmployeeRegistration from './components/EmployeeRegistration';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const checkAuth = () => {
  //     const authToken = localStorage.getItem("authToken");
  //     const storedUser = localStorage.getItem("username");
    
  //     let parsedUser = null;
  //     try {
  //       parsedUser = storedUser ? JSON.parse(storedUser) : storedUser;
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //       localStorage.removeItem("username"); // Clear invalid data
  //     }
    
  //     if (authToken && parsedUser) {
  //       setAuthenticated(true);
  //       setUser(parsedUser);
  //     } else {
  //       setAuthenticated(false);
  //       setUser(null);
  //     }
  //   };
    
  
  //   checkAuth();
  // }, [authenticated]); // ✅ Runs whenever authenticated state changes
  
  useEffect(() => {
    const checkAuth = () => {
        const authToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("username");

        let parsedUser = null;
        try {
            parsedUser = storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("username");
        }

        if (authToken && parsedUser) {
            setAuthenticated(true);
            setUser(parsedUser);
        } else {
            setAuthenticated(false);
            setUser(null);
        }
    };

    checkAuth();
}, []); // ✅ Runs only on mount

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setAuthenticated(false);
    setUser(null);
    navigate('/admin/login');
  };
  const PrivateRoute = ({ children }) => {
    return localStorage.getItem('authToken') ? children : <Navigate to="/admin/login" />;
};
 
  // const ProtectedRoute = ({ children, requiredRole }) => {
  //   if (!authenticated) {
  //     return <Navigate to="/admin/login" replace />;
  //   }
  //   if (requiredRole && user?.role !== requiredRole) {
  //     return <Navigate to="/" replace />;
  //   }
  //   return children;
  // };
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (authenticated === false) {
        return <Navigate to="/admin/login" replace />;
    }
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/admin/dashboard" replace />;
    }
    return children;
};
 

 
  // const showNavbar = location.pathname !== '/admin/login';
  // const showNavbar = location.pathname !== "/admin/login" && location.pathname !== "/admin/dashboard" ;
   const showNavbar = location.pathname == "/" 
  //  const showNavbar = !["/admin/login", "/admin/register"].includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <MyNavbar userRole={user?.role} handleLogout={handleLogout} />}
  
      <Routes>
        {/* Redirect '/' to '/admin/login' */}
        <Route path="/" element={<Navigate to="/" replace />} />
  
        <Route path="/admin/login" element={<AdminLogin setAuthenticated={setAuthenticated} setUser={setUser} />} />
        <Route path="/admin/register" element={<AdminRegistration />} />

  
        {/* <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="Admin"><AdminDashboard />AdminDashboard </ProtectedRoute>} /> */}
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        {/* <Route path="/admin/employee/registration" element={ <ProtectedRoute requiredRole="Admin"><EmployeeRegistration/> EmployeeList </ProtectedRoute>}/> */}
        <Route path="/admin/employee/registration" element={<ProtectedRoute requiredRole="Admin"><EmployeeRegistration /></ProtectedRoute>} />


        <Route path="/admin/employees" element={<ProtectedRoute requiredRole="Admin"><EmployeeList />EmployeeList </ProtectedRoute>} />
  
        <Route path="/admin/registration" element={<AdminRegistrationPage />} />

  
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;