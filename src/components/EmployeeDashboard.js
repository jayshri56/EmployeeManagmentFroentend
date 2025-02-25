import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table } from 'react-bootstrap';

const EmployeeDashboard = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [performanceReviews, setPerformanceReviews] = useState([]);

    useEffect(() => {
        // Fetch employee profile data
        axios.get('/api/employee/profile')
            .then(response => setEmployeeData(response.data))
            .catch(error => console.error('Error fetching employee profile:', error));

        // Fetch leave requests
        axios.get('/api/leave-requests/employee')
            .then(response => setLeaveRequests(response.data))
            .catch(error => console.error('Error fetching leave requests:', error));

        // Fetch performance reviews
        axios.get('/api/performance-reviews/employee')
            .then(response => setPerformanceReviews(response.data))
            .catch(error => console.error('Error fetching performance reviews:', error));
    }, []); // Runs only once on component mount

    return (
        <div className="container mt-5">
            <h2>Employee Dashboard</h2>

            {/* Employee Profile Section */}
            {employeeData && (
                <Card className="mb-3">
                    <Card.Header>Employee Profile</Card.Header>
                    <Card.Body>
                        <h5>Name: {employeeData.name}</h5>
                        <p>Email: {employeeData.email}</p>
                        <p>Department: {employeeData.department}</p>
                        <p>Designation: {employeeData.designation}</p>
                        <p>Joining Date: {employeeData.joiningDate}</p>
                    </Card.Body>
                </Card>
            )}

            {/* Leave Requests Section */}
            <Card className="mb-3">
                <Card.Header>Leave Requests</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.leaveType}</td>
                                    <td>{request.startDate}</td>
                                    <td>{request.endDate}</td>
                                    <td>{request.status}</td>
                                    <td>
                                        {/* Optionally provide the ability to cancel a leave request */}
                                        {request.status === 'Pending' && (
                                            <Button variant="danger" onClick={() => handleCancelLeave(request.id)}>
                                                Cancel
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Performance Reviews Section */}
            <Card className="mb-3">
                <Card.Header>Performance Reviews</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Review Date</th>
                                <th>Rating</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performanceReviews.map(review => (
                                <tr key={review.id}>
                                    <td>{review.reviewDate}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

// Optionally, you can implement the function to cancel leave requests
const handleCancelLeave = (requestId) => {
    axios.delete(`/api/leave-requests/cancel/${requestId}`)
        .then(response => {
            alert('Leave request canceled');
            // Optionally, re-fetch leave requests
        })
        .catch(error => console.error('Error canceling leave request:', error));
};

export default EmployeeDashboard;
