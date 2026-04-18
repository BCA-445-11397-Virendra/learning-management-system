import Navbar from '@/components/custom/Navbar';
import Footer from '@/pages/Footer';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
     <div>
          <Navbar/>
          <div>
             <Outlet/>
          </div>
          <Footer/>
     </div>
  );
}

export default MainLayout;
