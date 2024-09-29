import useNotification from '@app/core/services/useNotificationService';

export default function GenericBackendService<T>(baseUrl: string) {
  const { toastError } = useNotification();

  const handleErrors = (error: any, action: string) => {
    toastError(error, `Error ${action} en ${baseUrl}`);
    throw error;
  };

  const lista = async (endpoint: string, params: Record<string, any> = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${baseUrl}/${endpoint}${queryString ? `?${queryString}` : ''}`);
      if (!response.ok) throw new Error(`Error al obtener datos de ${endpoint}`);
      return await response.json();
    } catch (error) {
      handleErrors(error, 'obtener todos los documentos');
    }
  };

  const crear = async (endpoint: string, data: T): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Error al crear el documento en ${endpoint}`);
      return await response.json();
    } catch (error) {
      handleErrors(error, 'crear documento');
    }
  };

  const actualizar = async (endpoint: string, data: Partial<T>): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Error al actualizar el documento en ${endpoint}`);
      return await response.json();
    } catch (error) {
      handleErrors(error, `actualizar documento en ${endpoint}`);
    }
  };

  const borrar = async (endpoint: string): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`Error al eliminar el documento de ${endpoint}`);
    } catch (error) {
      handleErrors(error, `eliminar documento de ${endpoint}`);
    }
  };

  const inactivar = async (endpoint: string, data: Partial<T>): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Error al inactivar el documento en ${endpoint}`);
      return await response.json();
    } catch (error) {
      handleErrors(error, `inactivar documento en ${endpoint}`);
    }
  };

  const obtener = async (endpoint: string): Promise<T | null> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`);
      if (!response.ok) throw new Error(`Error al obtener el documento de ${endpoint}`);
      return await response.json();
    } catch (error) {
      handleErrors(error, `obtener documento de ${endpoint}`);
      return null;
    }
  };

  return {
    lista,
    crear,
    actualizar,
    borrar,
    inactivar,
    obtener
  };
}
