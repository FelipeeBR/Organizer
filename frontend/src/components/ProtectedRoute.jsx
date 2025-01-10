import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { validateToken } from '../authUser';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      if(!token) {
        setIsValid(false);
        return;
      }
      const result = await validateToken(token);
      setIsValid(!!result); 
    };
    checkToken();
  }, [token]);

  if(isValid === null) {
    return <div>Carregando...</div>; 
  }
  if(!isValid) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
