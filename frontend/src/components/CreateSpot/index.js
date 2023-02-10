import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CreateSpot({ user }) {
  const hostingRoute = 'hosting'
  return (
    <>
    <NavLink to={`/${hostingRoute}/home`}
    style={{ textDecoration: "none", color: "black" }}
    >
      <span>Instabnb your home</span>
      </NavLink>
    </>
  );
}
