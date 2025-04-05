import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get user from backend session
        const response = await AuthService.getCurrentUser();
        
        // Update localStorage and state
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("email", response.data.email);
        
        // Navigate to community
        navigate('/community');
      } catch (error) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return <div>Completing login...</div>;
};

export default OAuthCallback;