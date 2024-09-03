/** @format */

import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../Cart";
import DropdownMenu from "../DropDownMenu/DropDownMenu";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";

function Navigation() {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  const user = useSelector((state) => state.session.user);
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
        {!user ? (
          <>
            <NavLink to='/login' className='navlink'>
              Sign in
            </NavLink>

            <NavLink to='/signup' className='navlink primary-btn'>
              Sign Up
            </NavLink>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Cart className='navlink' />
            <DropdownMenu
              items={[
                user.username,
                user.email,
                <NavLink
                  key={0}
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                  to='/stores/current'
                >
                  My Stores
                </NavLink>,
                <NavLink
                  key={1}
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                  to='/products/current'
                >
                  My Products
                </NavLink>,
                <NavLink
                  key={2}
                  className={({ isActive }) =>
                    isActive ? "active navlink" : "navlink"
                  }
                  to='/user/current'
                >
                  Profile
                </NavLink>,
                <button
                  key={3}
                  className='navlink primary-btn'
                  style={{ border: "none" }}
                  onClick={logout}
                >
                  Log Out
                </button>,
              ]}
              icon={<FaUserCircle />}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
