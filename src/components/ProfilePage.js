import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployeeProfile } from '../redux/employeeSlice';
import { getEmployeeProfile, updateEmployeeProfile } from '../services/api';
import { Button, TextField, CircularProgress } from '@mui/material';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.employee.profile);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch employee profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getEmployeeProfile(1); // Example: Fetch profile by ID
        dispatch(setEmployeeProfile(response.data)); // Dispatch to Redux store
        setUpdatedProfile(response.data); // Update local state
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!profile.id) { // Only fetch if no profile is set in Redux
      fetchProfile();
    }
  }, [dispatch, profile.id]);

  // Handle edit button click
  const handleEdit = () => {
    setEditMode(true);
  };

  // Handle save button click
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateEmployeeProfile(profile.id, updatedProfile); // Update employee profile via API
      setEditMode(false);
      dispatch(setEmployeeProfile(updatedProfile)); // Save updated profile in Redux state
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input change for profile fields
  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  // If profile is not yet fetched, display loading state
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="container">
      <h2>Employee Profile</h2>
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <TextField
              label="Name"
              name="name"
              value={updatedProfile.name || ''}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Email"
              name="email"
              value={updatedProfile.email || ''}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Department"
              name="department"
              value={updatedProfile.department || ''}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Designation"
              name="designation"
              value={updatedProfile.designation || ''}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
            />
          </div>
          {/* Show edit button if not in edit mode, save button if in edit mode */}
          {!editMode ? (
            <Button variant="contained" onClick={handleEdit}>Edit</Button>
          ) : (
            <Button variant="contained" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
