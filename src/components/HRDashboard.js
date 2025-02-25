import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Table } from 'react-bootstrap';

const HRDashboard = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [performanceReviews, setPerformanceReviews] = useState([]);

    useEffect(() => {
        // Fetch leave requests
        axios.get('/api/leave-requests')
            .then(response => setLeaveRequests(response.data))
            .catch(error => console.error('Error fetching leave requests:', error));

        // Fetch performance reviews
        axios.get('/api/performance-reviews')
            .then(response => setPerformanceReviews(response.data))
            .catch(error => console.error('Error fetching performance reviews:', error));
    }, []); // Initial fetch on component mount

    // Handle approve and reject leave requests
    const handleApprove = (requestId) => {
        axios.post(`/api/leave-requests/approve/${requestId}`)
            .then(response => {
                alert('Leave request approved');
                fetchLeaveRequests(); // Re-fetch leave requests after action
            })
            .catch(error => console.error('Error approving leave request:', error));
    };

    const handleReject = (requestId) => {
        axios.post(`/api/leave-requests/reject/${requestId}`)
            .then(response => {
                alert('Leave request rejected');
                fetchLeaveRequests(); // Re-fetch leave requests after action
            })
            .catch(error => console.error('Error rejecting leave request:', error));
    };

    // Fetch leave requests after approve/reject action
    const fetchLeaveRequests = () => {
        axios.get('/api/leave-requests')
            .then(response => setLeaveRequests(response.data))
            .catch(error => console.error('Error fetching leave requests:', error));
    };

    return (
        <div className="container mt-5">
            <h2>HR Dashboard</h2>

            {/* Leave Requests Section */}
            <Card className="mb-3">
                <Card.Header>Leave Requests</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Employee Name</th>
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
                                    <td>{request.employeeName}</td>
                                    <td>{request.leaveType}</td>
                                    <td>{request.startDate}</td>
                                    <td>{request.endDate}</td>
                                    <td>{request.status}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            onClick={() => handleApprove(request.id)}
                                            disabled={request.status === 'Approved'}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleReject(request.id)}
                                            disabled={request.status === 'Rejected'}
                                        >
                                            Reject
                                        </Button>
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
                                <th>Employee Name</th>
                                <th>Review Date</th>
                                <th>Rating</th>
                                <th>Comments</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performanceReviews.map(review => (
                                <tr key={review.id}>
                                    <td>{review.employeeName}</td>
                                    <td>{review.reviewDate}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.comments}</td>
                                    <td>
                                        <Link to={`/performance-review/${review.id}`}>
                                            <Button variant="info">View Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Analytics Section */}
            <Card>
                <Card.Header>Analytics</Card.Header>
                <Card.Body>
                    <div>
                        {/* Replace with actual charts or analytics data */}
                        <h5>Total Leave Requests: {leaveRequests.length}</h5>
                        <h5>Performance Reviews: {performanceReviews.length}</h5>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HRDashboard;
