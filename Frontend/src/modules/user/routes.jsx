import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHome from './home/UserHome';
import Login from './auth/Login';
import Signup from './auth/Signup';
import RequirementsForm from './requirements/RequirementsForm';
import VendorsList from './vendors/VendorsList';
import VendorDetail from './vendors/VendorDetail';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';

const UserRoutes = () => {
  return (
    <div className="min-h-screen bg-theme-card">
      <Header />
      <main className="pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/requirements" element={<RequirementsForm />} />
          <Route path="/vendors" element={<VendorsList />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
};

export default UserRoutes;