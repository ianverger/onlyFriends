import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
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

    // const [users, setUsers] = useState(allUsers);

    const findMatches = function(wordToMatch, allUsers) {
        return allUsers.filter(user => {
            const regex = new RegExp(wordToMatch, 'gi');
            return user.username.match(regex)        
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
        // console.log(user.id)
        const to = `/ProfilePage/${user.id}`;
        history.push(to);
        window.location.reload()
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
                        <p>{user.username}</p>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{friendStatus}</p>
                    </div>
                </button>
            </li>
        );
    });
    // useEffect(() => {
    //   if (!showMenu) return;
  
  
    //   document.addEventListener('click', closeMenu);
    
    //   return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

  console.log(allUsers)
// console.log(matchedUsers)


    return (
        <>
            <button onClick={openMenu} style={{fontSize: "20px"}} id="of-search" className="nav-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {showMenu && (
                <div id="search-drop">
                    <div id="search-drop-top">
                        <button onClick={closeMenu} id="sdbb">
                            <i class="fa-solid fa-arrow-left" id="sd-back-button"></i>
                        </button>
                        <input type="text" id="search-bar" onChange = {displayMatches} value={inputValue} />
                    </div>
                    <ul className="suggestions">
                        {matchedUsersList.length > 0 ? matchedUsersList : (<li style={{padding: "10px"}}>Filter for a user</li>)}
                    </ul>
                </div>
            )}
        </>
    )
}

export default NavSearch;