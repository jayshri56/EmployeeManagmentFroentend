import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
  Pagination,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "../css/EmployeeList.css";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'delete' or 'edit'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [summary, setSummary] = useState({ totalEmployees: 0, departments: 0, roles: 0 });
  const pageSize = 10;

  const roleMapping = {
    1: "Admin",
    2: "HR",
    3: "Employee",
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    if (!authToken || role !== "Admin") {
      alert("Unauthorized access! Redirecting to login...");
      navigate("/admin/login");
      return;
    }

    fetchEmployees(authToken);
    fetchSummary(authToken);
  }, [currentPage, filterDepartment, filterRole]);

  const fetchEmployees = async (authToken) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/employee/list`, {
        params: { page: currentPage - 1, size: pageSize, department: filterDepartment, role: filterRole },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setEmployees(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      setErrorMessage("Failed to fetch employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async (authToken) => {
    try {
      const response = await axios.get("http://localhost:8080/api/employee/summary", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setSummary(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch summary.");
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    
    const authToken = localStorage.getItem("authToken"); // Get the token
  
    try {
      await axios.delete(`http://localhost:8080/api/employee/delete/${selectedEmployee.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }, // Include the token
      });
  
      // Update the state after deletion
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== selectedEmployee.id)
      );
  
      alert("Employee deleted successfully!");
    } catch (error) {
      setErrorMessage("Failed to delete employee. Please try again.");
    } finally {
      handleCloseModal();
    }
  };
  

  const handleUpdate = async () => {
    if (!selectedEmployee) return;
    
    const authToken = localStorage.getItem("authToken"); // Get the token
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/employee/update/${selectedEmployee.id}`, // Ensure this endpoint matches the backend
        editForm,
        {
          headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" }, // Include headers
        }
      );
  
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === selectedEmployee.id ? response.data : employee
        )
      );
  
      alert("Employee updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update employee. Please try again.");
    } finally {
      handleCloseModal();
    }
  };
  

  const showModalHandler = (employee, type) => {
    setSelectedEmployee(employee);
    setModalType(type);
    if (type === "edit") {
      setEditForm({ ...employee });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setEditForm({});
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="employee-dashboard mt-5">
      <h2 className="text-center my-3">Employee Dashboard</h2>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Summary Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Employees</Card.Title>
              <Card.Text>{summary.totalEmployees}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Departments</Card.Title>
              <Card.Text>{summary.departments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Roles</Card.Title>
              <Card.Text>{summary.roles}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Form className="mb-4 d-flex justify-content-between">
        <Form.Control
          type="text"
          placeholder="Filter by Department"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        />
        <Form.Select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="mx-2"
        >
          <option value="">Filter by Role</option>
          <option value="1">Admin</option>
          <option value="2">HR</option>
          <option value="3">Employee</option>
        </Form.Select>
        <Button variant="primary" onClick={() => fetchEmployees(localStorage.getItem("authToken"))}>
          Apply Filters
        </Button>
      </Form>

      {/* Employee Table */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : employees.length > 0 ? (
        <>
          <Table striped bordered hover responsive className="employee-table">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Join Date</th>
                <th>Date of Birth</th>
                <th>Role</th>
                <th>Username</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.joinDate}</td>
                  <td>{employee.dob}</td>
                  <td>{roleMapping[employee.roleId] || "Unknown"}</td>
                  <td>{employee.username}</td>
                  <td>{employee.address}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => showModalHandler(employee, "edit")}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => showModalHandler(employee, "delete")}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <p className="text-center">No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;
