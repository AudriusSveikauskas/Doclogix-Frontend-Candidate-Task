import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  </BrowserRouter>
);

export default App;
