import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    username: "",
    dob: "",
    join_date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch employee profile data
  useEffect(() => {
    axios
      .get("/api/employee/profile")
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee profile:", error);
      });
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Validate input before saving
  const validateInputs = () => {
    if (!employee.name || !employee.email || !employee.username) {
      setErrorMessage("Name, Email, and Username are required fields.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Save updated profile
  const handleSave = () => {
    if (!validateInputs()) return;

    axios
      .put("/api/employee/profile", employee)
      .then(() => {
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="container">
      <h2>Employee Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isEditing ? (
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

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Designation:</strong> {employee.designation}</p>
          <p><strong>Username:</strong> {employee.username}</p>
          <p><strong>Date of Birth:</strong> {employee.dob}</p>
          <p><strong>Join Date:</strong> {employee.join_date}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;