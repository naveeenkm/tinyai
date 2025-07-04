import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import api, { checkProtectedRoute, loginUser, registerUser } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const { setUser } = useAuth(); 

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      setSubmitting(true);
     
      const response = await api.post('/api/auth/google/', {
        credential: credentialResponse.credential
      });

      // Store token and user data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      toast.success('Google login successful!');
      navigate('/chat');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error || 'Google login failed');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      setSubmitting(true);
  
      if (isLogin) {
        // 1. Call loginUser to store token
        await loginUser(email, password);
  
        // 2. Validate token via protected route
        const response = await checkProtectedRoute();
  
        // 3. Store user in context
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
  
        // 4. Show success toast and navigate
        toast.success('Login successful!', {
          description: 'Redirecting to your dashboard...',
        });
        navigate('/chat');
      } else {
        await registerUser(email, password);
        toast.success('Account created!', {
          description: 'Please log in with your credentials',
        });
        navigate('/login');
      }
    } catch (error: any) {
      const message = error?.response?.data?.error_message || 'Something went wrong!';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-xl shadow-sm border border-deepseek-border">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
        <p className="text-gray-500">
          {isLogin ? 'Sign in to access your account' : 'Create a new account'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border ${emailError ? 'border-red-500' : 'border-deepseek-border'}`}
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border ${passwordError ? 'border-red-500' : 'border-deepseek-border'}`}
          />
          {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`border ${confirmPasswordError ? 'border-red-500' : 'border-deepseek-border'}`}
            />
            {confirmPasswordError && (
              <p className="text-sm text-red-500">{confirmPasswordError}</p>
            )}
             
          </div>
          
        )}

        <Button type="submit" className="w-full deepseek-gradient" disabled={submitting}>
          {submitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
              <span className="ml-2">{isLogin ? 'Signing In...' : 'Signing Up...'}</span>
              
            </div>
          ) : (
            <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
          )}
        </Button>

       {isLogin&&(
        <div className="text-center">
          <Link to="/forgot-password" className="text-deepseek-lightblue font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>
       )
      }
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-deepseek-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error('Google login failed');
              }}
              useOneTap
              text="continue_with"
              shape="rectangular"
              size="large"
            />
          </div>
        </GoogleOAuthProvider>
      </form>

      <div className="text-center text-sm">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-deepseek-lightblue font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-deepseek-lightblue font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;