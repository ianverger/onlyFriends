import React from 'react';
import { NavLink, Redirect, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import FriendRequests from './FriendRequests';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  let leftLinks;
  let rightLinks;
  let centerLinks;
  if (sessionUser) {
    leftLinks = (
      <>
        <button onClick={(e) => history.push('/HomePage')} className="nav-icon">
            <img src={require('../../assets/of_logo.png')} style={{fontSize: "20px", height: "45px", width: "45px", borderRadius: "50%"}}/>
        </button>
        <button onClick={(e) => history.push('/users')} style={{fontSize: "20px", height: "45px", width: "45px"}} className="nav-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </>
    );

    centerLinks = (
      <div id="center-links">
        <a href="https://www.linkedin.com/in/ian-verger-02067951/" target="_blank" className="center-nav-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/38/38669.png" alt="LinkedIn" style={{height: "30px"}}/>
        </a>
        <a href="https://github.com/ianverger" target="_blank" className="center-nav-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style={{height: "30px"}}/>
        </a>
        <a href="" target="_blank" className="center-nav-icon">
          <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angellist-512.png" alt="AngelList" style={{height: "30px"}}/>
        </a>
      </div>
    );

    rightLinks = (
      <>
        <FriendRequests sessionUser={sessionUser} />
        <ProfileButton id="user-drop" className="nav-icon" user={sessionUser} />
      </>
    );
  } 

  return (
    <ul id={sessionUser ? "nav" : ""}>
        <li id="left-links">{leftLinks}</li>
        <li id="center-links">{centerLinks}</li>
        <li id="right-links">{rightLinks}</li>
    </ul>
  );
}

export default Navigation;

