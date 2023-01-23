import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './CreateSpot.css'

export default function CreateSpot({ user }) {
  const hostingRoute = 'hosting'
  return (
    <>
    <NavLink to={`/${hostingRoute}/home`}
    style={{ textDecoration: "none", color: "black" }}
    >
      <span className='instabnb-your-home'>Instabnb your home</span>
      </NavLink>
    </>
  );
}
