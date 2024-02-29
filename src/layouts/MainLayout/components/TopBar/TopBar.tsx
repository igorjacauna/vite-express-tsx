import { NavBar, NavBarMenu, NavBarMenuItem } from './styles';

export default function TopBar() {
  return (
    <NavBar className='container-fluid'>
      <NavBarMenu>
        <NavBarMenuItem>
          <a href='./' className='contrast' data-id='brand'>
            <strong>Brand</strong>
          </a>
        </NavBarMenuItem>
      </NavBarMenu>
      <NavBarMenu>
        <button type='button' data-id='logout' className='contrast none'>
          Logout
        </button>
      </NavBarMenu>
    </NavBar>
  );
}