// redux/employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    profile: {},
  },
  reducers: {
    setEmployeeProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setEmployeeProfile } = employeeSlice.actions;

export default employeeSlice.reducer;
