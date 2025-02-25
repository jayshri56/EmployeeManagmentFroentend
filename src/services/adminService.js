import axios from "axios";

const API_BASE_URL  = 'http://localhost:8080/api/admin';

const adminService = {
    registerAdmin: async (admin) => {
      return await axios.post(`${API_BASE_URL}/register`, admin, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
  };
  
  export default adminService;
