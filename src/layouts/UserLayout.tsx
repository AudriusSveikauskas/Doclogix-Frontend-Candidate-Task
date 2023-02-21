import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { menuActions } from '../store/menu/menu';

const UserLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.auth.isAuthenticated,
  );

  const setSelectedTab = (title: string) => {
    dispatch(menuActions.setSelectedTab(title));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      setSelectedTab('Upload');
    }
  }, [isAuthenticated]);

  return <Outlet />;
};

export default UserLayout;
