import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CreateSpot({ user }) {
  return (
    <>
    <NavLink to='/hosting/home'
    style={{ textDecoration: "none", color: "black" }}
    >
      <span>Instabnb your home</span>
      </NavLink>
    </>
  );
}
