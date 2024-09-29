import { Route, Routes } from 'react-router-dom';
import MainLayout from '@app/shared/layouts/MainLayout';
import PrivateRoute from '@app/shared/routes/PrivateRoute';
import useAuthService from '@app/core/services/useAuthService';
import NotFoundPage from '@app/shared/components/NotFoundPage';
import React, { useEffect, useState, lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@app/features/auth/pages/LoginPage'));
const PersonasRouter = lazy(() => import('@app/features/personas/PersonasRouter'));
const DashboardPage = lazy(() => import('@app/features/dashboard/pages/DashboardPage'));

export default function AppRouter() {
  const { user } = useAuthService();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, [user]);

  return (
    <React.Fragment>
      {isAuthChecked && user && (
        <MainLayout>
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/' element={<PrivateRoute Component={DashboardPage} />} />
              <Route path='/personas/*' element={<PrivateRoute Component={PersonasRouter} />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
      )}
    </React.Fragment>
  );
}
