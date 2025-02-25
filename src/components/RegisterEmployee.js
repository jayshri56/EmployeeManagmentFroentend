import React, { useState } from "react";
import axios from "axios";

const RegisterEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    username: "",
    dob: "",
    join_date: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Validate inputs
  const validateInputs = () => {
    if (!employee.name || !employee.email || !employee.username || !employee.password) {
      setErrorMessage("Name, Email, Username, and Password are required fields.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Register employee
  const handleRegister = () => {
    if (!validateInputs()) return;

    axios
      .post("/api/employee/register", employee)
      .then(() => {
        setSuccessMessage("Employee registered successfully!");
        setEmployee({
          name: "",
          email: "",
          department: "",
          designation: "",
          username: "",
          dob: "",
          join_date: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error registering employee:", error);
        setErrorMessage("Failed to register employee. Please try again.");
      });
  };

  return (
    <div className="container">
      <h2>Register New Employee</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleInputChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleInputChange}
        />

        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleInputChange}
        />

        <label>Designation:</label>
        <input
          type="text"
          name="designation"
          value={employee.designation}
          onChange={handleInputChange}
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={employee.username}
          onChange={handleInputChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={employee.password}
          onChange={handleInputChange}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={employee.dob}
          onChange={handleInputChange}
        />

        <label>Join Date:</label>
        <input
          type="date"
          name="join_date"
          value={employee.join_date}
          onChange={handleInputChange}
        />

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegisterEmployee;
