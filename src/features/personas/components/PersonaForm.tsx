import Select from '@mui/material/Select';
import BoxShadow from '@app/shared/layouts/BoxShadow';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PersonaService from '@app/core/services/PersonaService';
import { Persona } from '@app/features/personas/models/Persona';
import { useEffect, useMemo, useCallback, useState } from 'react';
import CustomTextField from '@app/shared/components/CustomTextField';
import { estadoPublicacionOptions } from '@app/core/mocks/DropdownOptions';
import { Button, FormControl, InputLabel, MenuItem, Snackbar } from '@mui/material';

const defaultValues: Persona = {
  Id: '',
  Rol: '',
  Email: '',
  Nombre: '',
  IdPais: '',
  NumDoc: '',
  Estado: '',
  TipoDoc: '',
  IdCiudad: '',
  Apellido: '',
  Telefono: '',
  Direccion: '',
  CuentaUsuario: '',
  IdDepartamento: '',
  FechaNacimiento: new Date()
};

interface ArticuloFormProps {
  isEditMode: boolean;
}

export default function PersonaForm({ isEditMode }: ArticuloFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const form = useForm<Persona>({
    defaultValues: defaultValues,
    mode: 'onTouched'
  });

  const { control, register, formState, handleSubmit, setValue, getValues, watch, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (isEditMode && id) {
      // Simula la carga de datos existentes
      PersonaService.getById(id).then(persona => {
        if (persona) {
          reset(persona);
        }
      });
    }
  }, [isEditMode, id, reset]);

  const estadoOptions = useMemo(() => estadoPublicacionOptions, []);

  const onSubmit = useCallback(
    async (persona: Persona) => {
      try {
        if (isEditMode) {
          await PersonaService.actualizar(persona.Id, persona);
          setSnackbarMessage('Persona actualizada exitosamente');
        } else {
          await PersonaService.crear(persona);
          setSnackbarMessage('Persona creada exitosamente');
        }
        setOpenSnackbar(true);
      } catch (error) {
        setSnackbarMessage('Ocurrió un error al guardar la persona');
        setOpenSnackbar(true);
      }
      // navigate('/personas');
    },
    [isEditMode]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  const fields = useMemo(
    () => [
      { name: 'Id', label: 'Id' },
      { name: 'Rol', label: 'Rol' },
      { name: 'Email', label: 'Email' },
      { name: 'Nombre', label: 'Nombre' },
      { name: 'IdPais', label: 'Id País' },
      { name: 'Telefono', label: 'Teléfono' },
      { name: 'Apellido', label: 'Apellido' },
      { name: 'IdCiudad', label: 'Id Ciudad' },
      { name: 'Direccion', label: 'Dirección' },
      { name: 'TipoDoc', label: 'Tipo de Documento' },
      { name: 'NumDoc', label: 'Número de Documento' },
      { name: 'CuentaUsuario', label: 'Cuenta de Usuario' },
      { name: 'IdDepartamento', label: 'Id Departamento' }
    ],
    []
  );

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <BoxShadow>
      <header className='mb-4 d-flex justify-content-between align-items-center'>
        <h2>{isEditMode ? 'Editar persona' : 'Nueva persona'}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className='row'>
          <div className='col-md-8'>
            {fields.map(({ name, label }) => (
              <div key={name} className='col-md-12 mb-3'>
                <CustomTextField
                  autoFocus={name === 'Id'}
                  type='text'
                  name={name}
                  label={label}
                  register={register(name)}
                  error={errors[name]?.message}
                />
              </div>
            ))}

            <div className='col-md-12 mb-3'>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  size='small'
                  label='Estado'
                  value={watch('Estado')}
                  onChange={event => setValue('Estado', event.target.value)}
                >
                  {estadoOptions.map((estado: string) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <Button
          type='submit'
          variant='contained'
          sx={{ marginTop: 2 }}
          disabled={isSubmitting || !isValid}
          color={isEditMode ? 'success' : 'primary'}
        >
          {isEditMode ? 'Actualizar' : 'Guardar'}
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </form>
    </BoxShadow>
  );
}
