import 'dayjs/locale/es';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@app/shared/routes/AppRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function App() {
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <BrowserRouter basename='/React-UribiaOnlineBackend'>
          <AppRouter />
        </BrowserRouter>
      </LocalizationProvider>
    </React.Fragment>
  );
}
