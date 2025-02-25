import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveType, setLeaveType] = useState('');
  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');
  const [leaveStatus, setLeaveStatus] = useState('Pending');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('Employee'); // Can be 'Employee', 'HR', or 'Admin'

  // Fetch leave requests when the component loads
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Fetch leave requests from the backend
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('/api/leaverequests'); // Adjust API endpoint
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests", error);
    }
  };

  // Handle leave request submission
  const submitLeaveRequest = async () => {
    if (!leaveType || !leaveFromDate || !leaveToDate) {
      setError('All fields are required.');
      return;
    }

    const leaveData = {
      leaveType,
      leaveFromDate,
      leaveToDate,
      leaveStatus: 'Pending',
    };

    try {
      await axios.post('/api/leaverequests', leaveData); // Adjust API endpoint
      fetchLeaveRequests(); // Refresh leave requests
      setLeaveType('');
      setLeaveFromDate('');
      setLeaveToDate('');
      setLeaveStatus('Pending');
      setError('');
    } catch (error) {
      console.error("Error submitting leave request", error);
    }
  };

  // Handle leave request approval or rejection
  const updateLeaveStatus = async (leaveId, status) => {
    try {
      await axios.put(`/api/leaverequests/${leaveId}`, { leaveStatus: status }); // Adjust API endpoint
      fetchLeaveRequests(); // Refresh leave requests
    } catch (error) {
      console.error("Error updating leave status", error);
    }
  };

  return (
    <div className="leave-management">
      <h2>Leave Management</h2>

      {/* Leave Application Form (Employee) */}
      {userRole === 'Employee' && (
        <div>
          <h3>Apply for Leave</h3>
          <div>
            <label>Leave Type</label>
            <input type="text" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} />
          </div>
          <div>
            <label>From Date</label>
            <input type="date" value={leaveFromDate} onChange={(e) => setLeaveFromDate(e.target.value)} />
          </div>
          <div>
            <label>To Date</label>
            <input type="date" value={leaveToDate} onChange={(e) => setLeaveToDate(e.target.value)} />
          </div>
          <button onClick={submitLeaveRequest}>Submit Leave Request</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

      {/* Leave Request List (Admin / HR) */}
      {(userRole === 'Admin' || userRole === 'HR') && (
        <div>
          <h3>Leave Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.leaveFromDate}</td>
                  <td>{request.leaveToDate}</td>
                  <td>{request.leaveStatus}</td>
                  <td>
                    {request.leaveStatus === 'Pending' && (
                      <div>
                        <button onClick={() => updateLeaveStatus(request.id, 'Approved')}>Approve</button>
                        <button onClick={() => updateLeaveStatus(request.id, 'Rejected')}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
