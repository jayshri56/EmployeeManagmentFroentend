import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import HRDashboard from "./HRDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = () => {
  const [role, setRole] = useState("");  // This should be fetched from the logged-in user's JWT or session

  useEffect(() => {
    // Assuming you have a function to fetch user role from backend or JWT token
    axios.get("/api/getUserRole")
      .then(response => {
        setRole(response.data.role); // Set the role based on the backend response
      });
  }, []);

  return (
    <div>
      {role === "ADMIN" && <AdminDashboard />}
      {role === "HR" && <HRDashboard />}
      {role === "EMPLOYEE" && <EmployeeDashboard />}
    </div>
  );
};

export default Dashboard;
