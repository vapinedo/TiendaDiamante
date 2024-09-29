import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BoxShadow from '@app/shared/layouts/BoxShadow';
import { DataGrid, GridColDef, GridToolbar, GridValidRowModel } from '@mui/x-data-grid';

interface AdminTableProps<T extends GridValidRowModel> {
  data: T[];
  title: string;
  loading: boolean;
  createRoute: string;
  fetchData: () => void;
  toolbarProps?: object;
  columns: GridColDef<T>[];
  pageSizeOptions?: number[];
  getRowId?: (row: T) => string;
}

const AdminTable = <T extends GridValidRowModel>({
  data,
  title,
  loading,
  fetchData,
  columns,
  createRoute,
  toolbarProps = {},
  pageSizeOptions = [12],
  getRowId = row => row.Id
}: AdminTableProps<T>) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Cargando datos...</div>;
  if (!loading && data.length === 0) return <div>No hay datos disponibles.</div>;

  return (
    <BoxShadow>
      <header className='d-flex justify-content-between align-items-center'>
        <h2>{title}</h2>
        <button onClick={() => navigate(createRoute)} className='btn btn-primary' aria-label={`Crear nuevo ${title}`}>
          Crear nuevo
        </button>
      </header>

      <Box sx={{ height: '100%', width: '100%', marginTop: 1 }}>
        <DataGrid
          rows={data}
          density='compact'
          columns={columns}
          loading={loading}
          getRowId={getRowId}
          disableRowSelectionOnClick
          pageSizeOptions={pageSizeOptions}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              ...toolbarProps,
              showQuickFilter: true
            }
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSizeOptions[0] || 12
              }
            }
          }}
          sx={{
            border: 'none',
            overflowX: 'hidden',
            '& .css-128fb87-MuiDataGrid-toolbarContainer': {
              display: 'flex',
              marginTop: '12px',
              marginBottom: '22px',
              flexDirection: 'row-reverse'
            }
          }}
          localeText={{
            toolbarExport: 'Exportar',
            toolbarQuickFilterPlaceholder: 'Buscar...'
          }}
        />
      </Box>
    </BoxShadow>
  );
};

export default AdminTable;
