import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';
import './LoginForm.css';
import SignupFormModal2 from '../SignupFormModal/SignupFormModal2';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
 
  if (sessionUser) return <Redirect to="/HomePage" />

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const demoHandleClick = e => {
    const demo = {credential: "demo@user.com", password: "password"}
    return dispatch(sessionActions.login(demo))
  }

  return (
    <div className="container">
      <div id="recent-logins">
        <h1 id="logo">OnlyFriends</h1>
        <h2 id="title">Recent Logins</h2>
        <p id="sub">Click your picture or add an account.</p>
        <div id="cards">
          <div id="demo-card" onClick={demoHandleClick}>
            <img src={require('../../assets/andy_demo.jpg')} id="demo-img" alt="demo-img" />
            <div className="username">Demo</div>
          </div>
          <SignupFormModal2 />
        </div>
      </div>
        <div className="login">
          <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="credential"
                placeholder="Username or Email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
              <input
                type="password"
                className="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <ul>
                  {errors.map(error => <li className="errors" key={error}>{error}</li>)}
                </ul>
            <button type="submit" className="login-button">Log In</button>
            <Link to="#" id="forgot-pw">Forgot Password?</Link>
            <hr id ="hr"/>
          </form>
            <div id="create-div"><SignupFormModal/></div>
        </div>
    </ div>
  );
}

export default LoginFormPage;