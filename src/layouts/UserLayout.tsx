import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const UserLayout = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    // pakeisti
    if (isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated]);

  return <Outlet />;
};

export default UserLayout;
