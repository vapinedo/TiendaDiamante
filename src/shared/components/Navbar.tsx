import { NavLink, useNavigate } from 'react-router-dom';
import useAuthService from '@app/core/services/useAuthService';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthService();

  const handleLogout = async () => {
    const logoutResponse = await logout();
    if (logoutResponse === undefined) {
      navigate('/login');
    }
  };

  return (
    <nav
      className='navbar navbar-expand-lg bg-body-tertiary bg-dark animate__animated animate__fadeInDown animate_faster'
      data-bs-theme='dark'
    >
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          Tecno Ventas{' '}
        </NavLink>

        <button
          type='button'
          aria-expanded='false'
          data-bs-toggle='collapse'
          className='navbar-toggler'
          aria-label='Toggle navigation'
          aria-controls='navbarSupportedContent'
          data-bs-target='#navbarSupportedContent'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to='/'>
                Inicio
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to='/personas'>
                Personas
              </NavLink>
            </li>
          </ul>

          {user && (
            <button onClick={handleLogout} className='btn btn-danger'>
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
