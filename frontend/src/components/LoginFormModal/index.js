import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setHasSubmitted(true);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        console.log("this", data);
      });
  };

  const demoUser = (e) => {
    e.preventDefault();
    const password = "password";
    const credential = "demo@user.io";
    dispatch(sessionActions.login({ credential, password })).then(closeModal);
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-top-bar-container">
        <div className="login-x-icon-box">
          <i onClick={closeModal} class="fa-solid fa-x" id="x-icon"></i>
        </div>
        <div className="login-title-box">
          <h4>Login</h4>
        </div>
      </div>
      <div className="welcome-login-form-box">
        <div className="welcome-login-box">
          <h1>Welcome to Instabnb</h1>
        </div>
        <div className="login-form-box"></div>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
          <ul className='errors-ul'>
            {errors.length > 0 && hasSubmitted
              ? errors.map((error, idx) => {
                  return <li key={idx}>{error}</li>;
                })
              : null}
            {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
          </ul>
          <button type="submit">Log In</button>
          <button onClick={demoUser}>Demo User</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
