import { GridColDef } from '@mui/x-data-grid';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminTable from '@app/shared/components/AdminTable';
import usePersonaStore from '@app/core/stores/usePersonaStore';
import { Persona } from '@app/features/personas/models/Persona';
import { Estado } from '@app/shared/constants/estadoPublicacion';
import useNotification from '@app/core/services/useNotificationService';
import useEstadoPublicacion from '@app/shared/hooks/useEstadoPublicacion';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function PersonasAdminPage() {
  const navigate = useNavigate();
  const { dialogConfirm } = useNotification();
  const { getClassByState } = useEstadoPublicacion();
  const { personas, loading, lista, borrar } = usePersonaStore(state => ({
    loading: state.loading,
    personas: state.personas,
    lista: state.lista,
    borrar: state.borrar
  }));

  const handleActions = (params: any) => {
    return (
      <>
        <IconEdit color='#00abfb' cursor='pointer' onClick={() => navigate(`/personas/actualizar/${params.id}`)} />
        <IconTrash color='#ff2825' cursor='pointer' style={{ marginLeft: 15 }} onClick={() => handleDelete(params)} />
      </>
    );
  };

  const handleDelete = async ({ row }: { row: Persona }) => {
    const text = `Vas a eliminar a ${row.Nombre} ${row.Apellido}`;
    const { isConfirmed } = await dialogConfirm(text);
    // if (isConfirmed) {
    //   borrar(row.Id);
    // }
  };

  const columns: GridColDef<Persona>[] = [
    {
      field: 'Nombre',
      headerName: 'Nombre',
      width: 300,
      editable: true,
      renderCell: ({ row }) => (
        <NavLink
          title={`Ver detalles de ${row.Nombre} ${row.Apellido}`}
          className='grid-table-linkable-column'
          to={`/personas/detalle/${row.Id}`}
        >
          {row.Nombre} {row.Apellido}
        </NavLink>
      )
    },
    {
      field: 'Apellido',
      headerName: 'Apellido',
      width: 300,
      editable: true
    },
    {
      field: 'Email',
      headerName: 'Email',
      width: 300,
      editable: true
    },
    {
      field: 'Rol',
      headerName: 'Rol',
      width: 300,
      editable: true
    },
    {
      field: 'Estado',
      headerName: 'Estado',
      width: 180,
      editable: true,
      renderCell: ({ row }) => {
        const estado = row.Estado === '1' ? Estado.Activo : Estado.Inactivo;
        const estadoTexto = estado === Estado.Activo ? 'Activo' : 'Inactivo';
        const className = getClassByState(estado);
        return <span className={className}>{estadoTexto}</span>;
      }
    },
    {
      field: ' ',
      renderCell: handleActions
    }
  ];

  return (
    <AdminTable
      data={personas}
      loading={loading}
      columns={columns}
      fetchData={lista}
      title='Gestión de Personas'
      createRoute='/personas/nuevo'
    />
  );
}
