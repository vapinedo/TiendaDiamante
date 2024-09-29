import { Route, Routes } from 'react-router-dom';
import PersonaForm from '@app/features/personas/components/PersonaForm';
import PersonasAdminPage from '@app/features/personas/pages/PersonasAdminPage';
import PersonaDetallePage from '@app/features/personas/pages/PersonaDetallePage';

export default function PersonasRouter() {
  return (
    <Routes>
      <Route path='/' element={<PersonasAdminPage />} />
      <Route path='/detalle/:id' element={<PersonaDetallePage />} />
      <Route path='/nuevo' element={<PersonaForm isEditMode={false} />} />
      <Route path='/editar/:id' element={<PersonaForm isEditMode={true} />} />
    </Routes>
  );
}
