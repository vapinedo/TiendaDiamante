import { Estado } from '@app/shared/constants/estadoPublicacion';

export default function useEstadoPublicacion() {
  const getClassByState = (state: Estado): string => {
    let className = '';
    switch (state) {
      case Estado.Activo:
        className = 'badge text-bg-primary';
        break;
      case Estado.Inactivo:
        className = 'badge text-bg-danger';
        break;
      default:
        className = 'badge text-bg-default';
        break;
    }
    return className;
  };

  return { getClassByState };
}
