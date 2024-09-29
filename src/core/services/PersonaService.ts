import { Persona } from '@app/features/personas/models/Persona';
import useNotification from '@app/core/services/useNotificationService';
import GenericBackendService from '@app/core/services/GenericBackendService';
import { API_BASE_URL, personaEndpoints } from '@app/shared/constants/endpoints';

const ENTITY_NAME = 'Persona';
const { toastSuccess } = useNotification();

const personaService = GenericBackendService<Persona>(API_BASE_URL);

const PersonaService = {
  lista: async (): Promise<Persona[]> => {
    const response = await personaService.lista(personaEndpoints.LISTA);
    return response?.data || [];
  },
  crear: async (data: Persona): Promise<Persona> => {
    const result = await personaService.crear(personaEndpoints.CREAR, data);
    toastSuccess(`${ENTITY_NAME} creada con éxito`);
    return result;
  },
  actualizar: async (id: string, data: Partial<Persona>): Promise<Persona> => {
    const result = await personaService.actualizar(`${personaEndpoints.ACTUALIZAR}/${id}`, data);
    toastSuccess(`${ENTITY_NAME} actualizada con éxito`);
    return result;
  },
  borrar: async (id: string): Promise<void> => {
    await personaService.borrar(`${personaEndpoints.BORRAR}/${id}`);
    toastSuccess(`${ENTITY_NAME} eliminada con éxito`);
  },
  inactivar: async (id: string, data: Partial<Persona>): Promise<Persona> => {
    const result = await personaService.inactivar(`${personaEndpoints.ACTUALIZAR}/${id}`, data);
    toastSuccess(`${ENTITY_NAME} inactivada con éxito`);
    return result;
  },
  obtener: async (id: string): Promise<Persona | null> => {
    return await personaService.obtener(`${personaEndpoints.OBTENER}/${id}`);
  }
};

export default PersonaService;
