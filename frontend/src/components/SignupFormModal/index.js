import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (password !== confirmPassword)
      return setErrors({ confirmPassword: "Passwords do not match" });

    setErrors([]);
    const singupData = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    return dispatch(sessionActions.signup(singupData))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <div className="signup-form-wrapper">
        <div className="top-bar-container">
          <div className="x-icon-box">
              <i onClick={closeModal} class="fa-solid fa-x" id='x-icon'></i>
          </div>
          <div className="signup-title-box">
            <h4>Signup</h4>
          </div>
        </div>
        <div className="welcome-and-form-box">
          <div className="welcome-box">
            <h1>Welcome to Instabnb</h1>
          </div>
          <div className="signup-form-box">
            <form onSubmit={handleSubmit} className="signup-form">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <ul className='errors-ul'>
                {errors.firstName ? <li>{errors.firstName}</li> : null}
                {errors.lastName ? <li>{errors.lastName}</li> : null}
                {errors.username ? <li>{errors.username}</li> : null}
                {errors.password ? <li>{errors.password}</li> : null}
                {errors.confirmPassword ? (
                  <li>{errors.confirmPassword}</li>
                ) : null}
                {errors.email ? <li>{errors.email}</li> : null}
              </ul>

              <button type="submit">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormModal;
