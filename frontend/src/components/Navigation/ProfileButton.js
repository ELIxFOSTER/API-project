import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ListingsButton from "../ManageListings/ListingButton";
import { NavLink } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const listingsRoute = "listings";

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  // const demoUser = (e) => {
  //   e.preventDefault();
  //   const password = "password";
  //   const credential = "demo@user.io";
  //   dispatch(sessionActions.login({ credential, password }));
  //   closeMenu();
  // };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="nav-bar-button">
        <>
          <i className="fa-solid fa-bars fa-lg" id="profile-bars" />
          <i className="fa-solid fa-circle-user fa-2x" id="profile-icon" />
        </>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className='dropdown-content'>
            <span id='dropdown-username' >Hello, {user.username}</span>
          </div>
          <div className='dropdown-content'>
            <span id='dropdown-firstname'>
              {user.firstName} {user.lastName}
            </span>
          </div>
            <div className='dropdown-content' id='dropdown-listings-button' >
              <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/${listingsRoute}`}>
                <ListingsButton />
              </NavLink>
            </div>
          <div className='dropdown-content' id='logout-dropdown-button'>
            <span id='dropdown-logout'>
              <button id='logout-button' onClick={logout}>Log Out</button>
            </span>
          </div>
          </>
        ) : (
          <div className="popout-menu">
            <div className='popout-box'>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              className="signup-button"
            />
            </div>
            <div className='popout-box'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              className="login-button"
            />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
