import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";
import { register } from "../../redux/ducks/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.login.isFetching)



  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await dispatch(register(user));
        navigate("/login");
      } catch (error) {
        console.log("Registration failed: ", error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">smilewave</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on smilewave.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="4"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
            {isFetching ? (
              <CircularProgress />
            ) : (
              "Sign up"
            )}
            </button>
            <Link to="/login"> 
            <button className="loginRegisterButton">Already have an account?</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}