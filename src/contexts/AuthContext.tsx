import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User } from '@/types';
import { toast } from '@/components/ui/sonner';
import { checkProtectedRoute } from '@/services/api'; // API call to verify token

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // On load, check token validity
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      checkProtectedRoute()
        .then((response) => {
          console.log('Protected route response:', response);
          setUser(response.user); // Assuming backend returns { user: {...} }
          setIsLoading(false);
        })
        .catch(() => {
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
    toast.success('Logged out successfully');
  };

  const login = async (email: string, password: string) => {
    console.log('Login with email and password:', email, password);
  };

  const loginWithGoogle = async () => {
    console.log('Login with Google');
  };

  const register = async (email: string, password: string) => {
    console.log('Register with email and password:', email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        login,
        loginWithGoogle,
        register,
        setUser, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
