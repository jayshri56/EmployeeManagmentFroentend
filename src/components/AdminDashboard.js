import React, { useEffect, useState } from 'react';
import axios from 'axios';
import adminImage from '../img/admin.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Table, Spinner, Row, Col, Navbar, Collapse, Container, Dropdown, Image } from 'react-bootstrap';
import EmployeeRegistration from './EmployeeRegistration';
import EmployeeList from './EmployeeList';

const AdminDashboard = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [performanceReviews, setPerformanceReviews] = useState([]);
    const [loading, setLoading] = useState({ leaveRequests: true, performanceReviews: true, analytics: true });
    const [error, setError] = useState({});
    const [showEmployeeSubmenu, setShowEmployeeSubmenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const navigate = useNavigate();
    // const adminEmail = localStorage.getItem('username') || '';
    const [adminName, setAdminName] = useState('');
    const [analytics, setAnalytics] = useState({
        totalEmployees: 0,
        pendingLeaveRequests: 0,
        averagePerformanceRating: 0,
    });
    const adminEmail = localStorage.getItem('username') || '';

    // Fetch admin details, leave requests, performance reviews, and analytics
    useEffect(() => {
        // if (adminEmail) {
            fetchAdminName();
        // }
        // fetchLeaveRequests();
        // fetchPerformanceReviews();
        // fetchAnalytics();
    }, []);

    // // Fetch the admin's name
    // const fetchAdminName = async () => {
    //     if (!adminEmail) {
    //         console.error("Admin email is not found in localStorage.");
    //         setError((prev) => ({ ...prev, adminName: "Admin email not found." }));
    //         return;
    //     }

    //     try {
    //         const response = await axios.get(
    //             `http://localhost:8080/api/v1/admin/name?username=${encodeURIComponent(adminEmail)}`,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 withCredentials: true, // Add this if authentication is required
    //             }
    //         );
    //         setAdminName(response.data);
    //     } catch (err) {
    //         console.error("Failed to fetch admin name:", err);
    //         setError((prev) => ({ ...prev, adminName: "Failed to fetch admin name." }));
    //     }
    // };


    const fetchAdminName = async () => {
        if (!adminEmail) {
            console.error("Admin email not found in localStorage.");
            setError((prev) => ({ ...prev, adminName: "Admin email is missing." }));
            return;
        }
        const storedAdminName = localStorage.getItem('adminName');
        if (storedAdminName) {
            setAdminName(storedAdminName);
            return;
        }
    

        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/admin/name?username=${encodeURIComponent(storedAdminName)}`,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
           
            setAdminName(response.data); // Set fetched name
            localStorage.setItem('adminName', response.data);  // Store admin name in localStorage

        } catch (err) {
            console.error("Failed to fetch admin name:", err);

            // Handle different response errors
            if (err.response) {
                if (err.response.status === 400) {
                    setError("Username parameter is required.");
                } else if (err.response.status === 404) {
                    setError("Admin not found.");
                } else {
                    setError("Failed to fetch admin name.");
                }
            } else {
                setError("Network error. Please try again.");
            }
        }
    };



    // // Fetch analytics data
    // const fetchAnalytics = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/v1/analytics');
    //         setAnalytics(response.data);
    //     } catch (err) {
    //         setError((prev) => ({ ...prev, analytics: 'Failed to fetch analytics data.' }));
    //     } finally {
    //         setLoading((prev) => ({ ...prev, analytics: false }));
    //     }
    // };

    // // Fetch leave requests
    // const fetchLeaveRequests = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/v1/leave-requests');
    //         setLeaveRequests(response.data);
    //     } catch (err) {
    //         setError((prev) => ({ ...prev, leaveRequests: 'Failed to fetch leave requests.' }));
    //     } finally {
    //         setLoading((prev) => ({ ...prev, leaveRequests: false }));
    //     }
    // };

    // // Fetch performance reviews
    // const fetchPerformanceReviews = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/v1/performance-reviews');
    //         setPerformanceReviews(response.data);
    //     } catch (err) {
    //         setError((prev) => ({ ...prev, performanceReviews: 'Failed to fetch performance reviews.' }));
    //     } finally {
    //         setLoading((prev) => ({ ...prev, performanceReviews: false }));
    //     }
    // };

    // Handle logout
    const handleLogout = () => {
                localStorage.removeItem('adminName');

        localStorage.clear();
        navigate('/');
    };

    return (
        <Container fluid className="p-0 m-0" style={{ height: '100vh', overflowX: 'hidden' }}>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" className="shadow-sm mb-5 py-1 fixed-top" style={{ height: '10vh' }}>
                <Button variant="secondary" className="d-md-none" onClick={() => setShowSidebar(!showSidebar)}>
                    {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
                </Button>

                <Dropdown className="ms-auto">
                    <Dropdown.Toggle variant="link" id="dropdown-profile" className="text-light">
                        <div className="d-flex align-items-center">
                            <Image src={adminImage} roundedCircle width={50} height={50} className="me-2" />
                            <h6 className="mb-0 text-white"> Welcome {adminEmail || 'Admin'}</h6>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>

            {/* Sidebar and Content */}
            <Row className="flex-nowrap text-white" style={{ height: 'calc(100vh - 80px)' }}>
                {/* Sidebar */}
                <Col
                    md={2}
                    className={`bg-dark p-3 ${showSidebar ? 'd-block' : 'd-none'} d-md-block`}
                    style={{
                        position: 'fixed',
                        top: '56px',
                        height: '100vh',
                        overflowY: 'auto',
                        zIndex: 998,
                    }}
                >
                    <h4 className="text-white">Dashboard</h4>
                    <ul className="list-unstyled">
                        <li>
                            <Button
                                variant="link"
                                className="w-100 text-start text-light"
                                onClick={() => setShowEmployeeSubmenu(!showEmployeeSubmenu)}
                            >
                                Employees
                            </Button>
                            <Collapse in={showEmployeeSubmenu}>
                                <ul className="list-unstyled ms-3">
                                    <li>
                                        <Button
                                            variant="link"
                                            className="w-100 text-start text-light"
                                            // onClick={() => {
                                            //     setShowForm(true);
                                            //     setActiveSection('');
                                            // }}
                                            onClick={() => {
                                                setShowForm(true);
                                                setActiveSection('');
                                                // setTimeout(() => navigate('/admin/employee/registration'), 10000);
                                            }}
                                        >
                                            Register New Employee
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant="link"
                                            className="w-100 text-start text-light"
                                            onClick={() => {
                                                setShowForm(false);
                                                setActiveSection('employees');
                                            }}
                                        >
                                            Employee List
                                        </Button>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                        <li>
                            <Button variant="link" className="w-100 text-start text-light" onClick={() => setActiveSection('leaveRequests')}>
                                Leave Requests
                            </Button>
                        </li>
                        <li>
                            <Button variant="link" className="w-100 text-start text-light" onClick={() => setActiveSection('performanceReviews')}>
                                Performance Reviews
                            </Button>
                        </li>
                    </ul>
                </Col>

                {/* Main Content */}
                <Col md={10} className={`pt-3 ${showSidebar ? 'offset-md-2' : ''}`} style={{ marginLeft: showSidebar ? '16.67%' : '0', transition: 'margin-left 0.3s ease', height: 'calc(100vh - 65px)', overflowY: 'auto' }}>
                    {showForm && <EmployeeRegistration />}
                    {!showForm && activeSection === 'employees' && <EmployeeList />}
                    
                    {activeSection === 'leaveRequests' && !loading.leaveRequests && (
                        <Card className="mt-5 h-100">
                            <Card.Header>Leave Requests</Card.Header>
                            <Card.Body>{leaveRequests.length ? <Table striped bordered hover>{/* Table Data */}</Table> : <p>No leave requests found.</p>}</Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
