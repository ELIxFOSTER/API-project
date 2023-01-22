// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateSpot from "../CreateSpot";
import navlogo from "../../images/navlogo.png";
import { useParams } from "react-router-dom";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { hosting } = useParams();
  const {spotId} = useParams()

  const pageHandler = () => {
    if (hosting) return false
    if (spotId) return false
    return true
  }

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-contents">
          <NavLink exact to="/">
            <div className="navbar-home-logo">
              <img src={navlogo} className="logo" />
            </div>
          </NavLink>
          <div className="navbar-button-container">
            {!sessionUser || hosting || spotId ? (null) : (
              <div className="navbar-create-button">
              <CreateSpot user={sessionUser} />
            </div>
            )}
            {hosting || spotId ? (null) : (
               <>
               {isLoaded && (
                 <div className="navbar-profile-button">
                   <ProfileButton user={sessionUser} />
                 </div>
               )}
             </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
