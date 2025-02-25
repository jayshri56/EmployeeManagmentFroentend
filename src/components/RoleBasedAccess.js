import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const RoleBasedAccess = ({ children }) => {
  const [role, setRole] = useState(null);

  // Fetch user role on component mount
  useEffect(() => {
    axios.get("/api/employee/role")
      .then((response) => {
        setRole(response.data.role);
      })
      .catch((error) => {
        console.error("Error fetching role:", error);
      });
  }, []);

  if (role === null) {
    return <div>Loading...</div>; // Or a spinner, loading state
  }

  // Role-based content rendering
  if (role === "Admin") {
    return <div>{children}</div>; // Admin can see the content
  } else if (role === "HR") {
    return <div>{children}</div>; // HR can see the content
  } else if (role === "Employee") {
    return <div>{children}</div>; // Employee can see their content
  } else {
    return <Redirect to="/unauthorized" />; // Redirect if unauthorized
  }
};

export default RoleBasedAccess;
