import {  useRef } from "react";
import "./login.css";
import { login } from "../../redux/ducks/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.login.isFetching)
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login(
      { email: email.current.value, password: password.current.value },
    ))
  };
 return (
  <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">smilewave</h3>
        <span className="loginDesc">
          start sharing positivity.
        </span>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Email"
            type="email"
            required
            className="loginInput"
            ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            minLength="4"
            className="loginInput"
            ref={password}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            {isFetching ? (
              <CircularProgress />
            ) : (
              "Log In"
            )}
          </button>
          <span className="loginForgot">Forgot Password?</span>
          <button className="loginRegisterButton">
            {isFetching ? (
              <CircularProgress />
            ) : (
              "Create a New Account"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
);
}