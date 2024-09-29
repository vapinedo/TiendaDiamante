import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@app/shared/components/Navbar';
import Breadcrumbs from '@app/shared/components/Breadcrumbs';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <section className='container-fluid mt-5 mb-5 px-5'>
      <Toaster />
      <Breadcrumbs />
      {children}
    </section>
  </>
);

export default MainLayout;
