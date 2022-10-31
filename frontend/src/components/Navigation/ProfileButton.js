import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { getUser, fetchUser } from '../../store/users';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  // const userId = user.id
  // const selectedUser = useSelector(getUser(userId));
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };
  const profilePicSrc = user.profilePicUrl ? user.profilePicUrl : require('../../assets/blank_profile_pic.png');
  
  return (
    <>
      <button onClick={openMenu} className="nav-icon" id="profile-icon">
        {user && <img src={profilePicSrc}  id="profile-icon"/>}
      </button>
    
      {showMenu && (
        <ul className="profile-dropdown">
          
            <button onClick={(e) => history.push(`/ProfilePage/${user.id}`)}>
              {user && <img src={profilePicSrc}  id="dropdown-profile-icon"/>}
              <p className="button-text">&nbsp;&nbsp;{user.firstName} {user.lastName}</p>
            </button>
            <button onClick={logout}>
              <i style={{fontSize: "32px", width: "35px"}} className="fa-solid fa-right-from-bracket"></i>
              <p className="button-text">&nbsp;&nbsp;Log Out</p>
            </button>
          
        </ul>
      )}
    </>
  );
}

export default ProfileButton;