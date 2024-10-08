import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav
      class='navbar sticky-top navbar-expand-lg'
      style={{ background: 'rgb(23, 48, 23)', color: 'white' }}
    >
      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarTogglerDemo01'
        aria-controls='navbarTogglerDemo01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarTogglerDemo01'>
        <Link class='navbar-brand' to='/'>
          <p style={{ color: 'white' }}>Banking System</p>
        </Link>
        <ul class='navbar-nav mr-auto mt-2 mt-lg-0'></ul>
        <form class='form-inline my-2 my-lg-0'>
          <ul class='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li class='nav-item'>
              <Link class='nav-link' to='/customers'>
                <p style={{ color: 'white' }}>Users</p>
              </Link>
            </li>
            <li class='nav-item'>
              <Link class='nav-link' to='/transactions'>
                <p style={{ color: 'white' }}>Transactions</p>
              </Link>
            </li>
            {/* <li class="nav-item">
              <Link class="nav-link" to="/add">
                New Customer
              </Link>
            </li> */}
          </ul>
        </form>
      </div>
    </nav>
  );
}
