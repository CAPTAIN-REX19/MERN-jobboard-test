import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAppContext();
  if (!token) {
    return <Navigate to="/register" replace />;
  }
  return children;
};

export default ProtectedRoute;
