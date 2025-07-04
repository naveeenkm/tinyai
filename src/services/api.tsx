import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


  export const checkProtectedRoute = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Debugging line

    const response = await api.get('/api/protected/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };


export const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login/`, {
        email,
        password,
      });
      console.log('Login response:', response.data); // Debugging line

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // API call for signup
  export const registerUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, {
        email,
        password,
      });
      
      return response.data;
    } catch (error) {
      
      throw error;
    }
  };

  export const loginWithGoogle = async () => {
    const response = await api.post('/api/login/google/');
    return response.data;
  };
  
  export const deleteAccount = async (userId: string) => {
    return api.delete('/api/deleteAccount/', {
      data: { id: userId },
    });
  };

  // Change password for authenticated user
export const changePassword = async (data: {
  id: string;
  currentPassword: string;
  newPassword: string;
}) => {
  return api.put('/api/changePassword/', data);
};




export const sendMessageToAI = async (message: string) => {
  try {
    const response = await api.post(`/api/chat/`, { message });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default api;