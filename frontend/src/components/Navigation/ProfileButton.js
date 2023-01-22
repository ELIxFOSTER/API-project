import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ListingsButton from "../ManageListings/ListingButton";
import { NavLink } from "react-router-dom";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const listingsRoute = 'listings'

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const demoUser = (e) => {
    e.preventDefault()
    const password = 'password'
    const credential = "demo@user.io"
    dispatch(sessionActions.login({credential, password}))
    closeMenu()
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      <button onClick={openMenu} className='nav-bar-button' >
        <>
        <i className='fa-solid fa-bars fa-lg' id='profile-bars'/>
        <i className='fa-solid fa-circle-user fa-2x' id='profile-icon'/>
        </>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            {/* <li>{user.email}</li> */}
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
            <li>
              <NavLink to={`/${listingsRoute}`}>
                <ListingsButton />
              </NavLink>
            </li>
          </>
        ) : (
          <div className='popout-menu'>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              className='signup-button'
            />
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              className='login-button'
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
