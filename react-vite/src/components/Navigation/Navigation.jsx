/** @format */

import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav id='nav-bar'>
      <ul id='nav-menu'>
        <p className='logo'>Digital Front</p>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
            to='/'
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
            to='/stores'
          >
            Stores
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
            to='/products'
          >
            Products
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
            to='/about'
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
            to='/contact'
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div id='account-actions'>
        <NavLink to='/login' className='navlink'>
          Sign in
        </NavLink>

        <NavLink to='/signup' className='navlink primary-btn'>
          Sign Up
        </NavLink>

        {/* <ProfileButton /> */}
      </div>
    </nav>
  );
}

export default Navigation;
