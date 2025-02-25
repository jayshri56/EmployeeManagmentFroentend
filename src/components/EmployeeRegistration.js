import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeRegistration = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    dob: "",
    joinDate: "",
    roleId: "",
    username: "",
    password: "",
    address: "",
    aadhaarCard: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  // Retrieve JWT token from local storage
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/admin/login"); // Redirect to login page
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...employeeData,
      role: { id: parseInt(employeeData.roleId) },
    };

    try {
      const response = await axios.post("http://localhost:8080/api/employee/register", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to the request headers
        },
      });

      setResponseMessage("Employee registered successfully!");
      alert("Employee registered successfully!");
      setEmployeeData({
        name: "",
        email: "",
        department: "",
        designation: "",
        dob: "",
        joinDate: "",
        roleId: "",
        username: "",
        password: "",
        address: "",
        aadhaarCard: "",
      });

      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken"); // Remove invalid token
        navigate("/admin/login"); // Redirect to login
      } else {
        setResponseMessage("Failed to register employee: " + error.message);
      }
    }
  };

  return (
    <div className="mt-5 container-fluid d-flex justify-content-center align-items-center" style={{ height: '120vh', maxWidth: '600px', width: '200%' }}>
      <div className="card shadow-lg p-3 mb-5 bg-white rounded" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="card-header text-center">
          <h2>Employee Registration</h2>
        </div>
        <div className="card-body">
          {responseMessage && <p className="alert alert-info">{responseMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="row text-start">
              <div className="form-group col-md-6">
                <label>Name</label>
                <input type="text" name="name" value={employeeData.name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email" name="email" value={employeeData.email} onChange={handleChange} className="form-control" required />
              </div>
            </div>
            <div className="row mt-3 text-start">
              <div className="form-group col-md-6">
                <label>Department</label>
                <input type="text" name="department" value={employeeData.department} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Designation</label>
                <input type="text" name="designation" value={employeeData.designation} onChange={handleChange} className="form-control" required />
              </div>
            </div>
            <div className="row mt-3 text-start">
              <div className="form-group col-md-6">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Join Date</label>
                <input type="date" name="joinDate" value={employeeData.joinDate} onChange={handleChange} className="form-control" required />
              </div>
            </div>
            <div className="row mt-3 text-start">
              <div className="form-group col-md-6">
                <label>Role</label>
                <select name="roleId" value={employeeData.roleId} onChange={handleChange} className="form-control" required>
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">HR</option>
                  <option value="3">Employee</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Username</label>
                <input type="text" name="username" value={employeeData.username} onChange={handleChange} className="form-control" required />
              </div>
            </div>
            <div className="row mt-3 text-start">
              <div className="form-group col-md-6">
                <label>Password</label>
                <input type="password" name="password" value={employeeData.password} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group col-md-6">
                <label>Address</label>
                <input type="text" name="address" value={employeeData.address} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="row mt-3 text-start">
              <div className="form-group col-md-6">
                <label>Aadhaar Card</label>
                <input type="text" name="aadhaarCard" value={employeeData.aadhaarCard} onChange={handleChange} className="form-control" maxLength="12" required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
