import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import "./ProfileButton.css"

import { useNavigate,Link } from 'react-router-dom';



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='profile_button_wrapper'>
      <div className='little_container'>

      {user && (
          <div id="create_spot_link">
            <Link to={"/spots/new"}>Create a New Spot</Link>
          </div>
      )}

      <button className = "user_icon" onClick={toggleMenu}>
        <FaUserCircle />

      </button>

      </div>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello,{user.firstName}</li>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <li>{user.email}</li>
            <li>
              <Link to={"/spots/current"}>Manage Spots</Link>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </li>
            
            <li>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
