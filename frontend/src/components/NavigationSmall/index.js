// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./NavigationSmall.css";
import CreateSpot from "../CreateSpot";
import navlogo from "../../images/navlogo.png";
import { useParams } from "react-router-dom";

function NavigationSmall({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { hosting } = useParams();
  const {edit} = useParams()

  const pageHandler = () => {
    if (hosting) return true
    if (edit) return true
    return false
  }

  let showCreate = (!sessionUser || hosting || edit ? 'hidden' : '"small-navbar-create-button"')





  return (
    <div className="small-navbar-wrapper">
      <div className="small-navbar-container">
        <div className="small-navbar-contents">
          <NavLink exact to="/">
            <div className="small-navbar-home-logo">
              <img src={navlogo} className="small-logo" />
            </div>
          </NavLink>
          <div className="small-navbar-button-container">
            {/* {!sessionUser || hosting || edit ? (null) : (
              <div className={showCreate}>
              <CreateSpot user={sessionUser} />
            </div>
            )} */}
            <div className={showCreate}>
              <CreateSpot user={sessionUser} />
            </div>

            {hosting || edit ? (null) : (
               <>
               {isLoaded && (
                 <div className="small-navbar-profile-button">
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

export default NavigationSmall;
