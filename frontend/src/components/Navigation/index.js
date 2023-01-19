// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateSpot from "../CreateSpot";
import logo from '../../images/logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar-wrapper">
      <div className='navbar-container'>
        <div className="navbar-contents">
          <NavLink exact to="/">
            <div className="navbar-home-logo">
              <img src={logo} className="logo"  />
            </div>
          </NavLink>
          <div className="navbar-button-container">
          {sessionUser ? (
              <div className="navbar-create-button">
                <NavLink to="/hosting/home">
                  <CreateSpot user={sessionUser} />
                </NavLink>
              </div>
            ) : null}
            {isLoaded && (
              <div className='navbar-profile-button'>
                <ProfileButton user={sessionUser} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
