import { useNavigate } from 'react-router-dom';
import { ComponentType, useEffect, useState } from 'react';
import LoginPage from '@app/features/auth/pages/LoginPage';
import useAuthService from '@app/core/services/useAuthService';

interface PrivateRouteProps {
  Component: ComponentType<any>;
}

const PrivateRoute = ({ Component }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { user } = useAuthService();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setIsAuthenticated(true);
      if (!user) {
        navigate('/login');
      }
    }
  }, [user, navigate]);

  if (isAuthenticated === false) {
    return <LoginPage />;
  }

  return isAuthenticated ? <Component /> : null;
};

export default PrivateRoute;
