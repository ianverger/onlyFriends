import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchAllUsers, getAllUsers } from '../../store/users';
import * as sessionActions from '../../store/session';
import './NavSearch.css'

function NavSearch({sessionUser}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const allUsers = useSelector(getAllUsers);
    const friendIds = sessionUser ? sessionUser.friends : null;
    const outPendIds = sessionUser ? sessionUser.outPending: null;
    const inPendIds = sessionUser? sessionUser.inPending: null;
    const [showMenu, setShowMenu] = useState(false);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [inputValue, setInputValue] = useState("");

 
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
    
    const closeMenu = () => {
      setShowMenu(false);
    };

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    const findMatches = function(wordToMatch, allUsers) {
        return allUsers.filter(user => {
            const regex = new RegExp(wordToMatch, 'gi');
            return (user.firstName.match(regex) || user.username.match(regex) || user.lastName.match(regex) || `${user.firstName} ${user.lastName}`.match(regex))    
        })
    }  

    const displayMatches = function(e) {
        setInputValue(e.target.value);
        const value = e.target.value;
        let matches = [];

        if (value) matches = findMatches(value, allUsers);
        setMatchedUsers(matches);
    }

    const handleSubmit = (user) => {
        history.push(`/ProfilePage/${user.id}`);
        closeMenu();
        setInputValue("");
        setMatchedUsers([]);
    }

    const matchedUsersList = matchedUsers.map((user, idx) => {
        let friendStatus;

        if (friendIds && friendIds.includes(user.id)) {
            friendStatus = <p>Friend</p>
        } else if (outPendIds && outPendIds.includes(user.id)) {
            friendStatus = <p>Requested</p>
        } else if (inPendIds && inPendIds.includes(user.id)) {
            friendStatus = <p>Pending</p>
        }

        return (
            <li key={idx}>
                <button id={`${idx}-user`} className="search-user-cards" onClick={(e) => handleSubmit(user)}>
                    <div>
                        <img src={user.profilePicUrl || require('../../assets/blank_profile_pic.png')} id="selected-user-profile-pic"/>
                        <div className="suc-text">
                            <p>{user.firstName} {user.lastName}</p>
                            <p>{friendStatus}</p>
                        </div>
                    </div>   
                </button>
            </li>
        );
    });

    useEffect(() => {
        if (!showMenu) return;
        
        window.addEventListener('click', function(e) {
            if (document.getElementById('search-drop') === null) return;
            if (document.getElementById('of-search') === null) return; 
            if (!document.getElementById('search-drop').contains(e.target) && !document.getElementById('of-search').contains(e.target)) closeMenu();
        })
    
        return () => window.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <button onClick={openMenu} style={{fontSize: "20px"}} id="of-search" className="nav-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {showMenu && (
                <div id="search-drop">
                    <div id="search-drop-top">
                        <button onClick={closeMenu} id="sdbb">
                            <i className="fa-solid fa-arrow-left" id="sd-back-button"></i>
                        </button>
                        <input type="text" id="search-bar" autoFocus="autoFocus" onChange={displayMatches} value={inputValue} />
                    </div>
                    <ul className="suggestions">
                        {matchedUsersList.length > 0 ? matchedUsersList : (<li id="filter-text" style={{padding: "10px"}}>Filter for a user...</li>)}
                    </ul>
                    <Link to="/users" onClick={closeMenu} id="uilink">See all Users</Link>
                </div>
            )}
        </>
    )
}

export default NavSearch;