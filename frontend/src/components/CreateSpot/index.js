import React from "react";
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
