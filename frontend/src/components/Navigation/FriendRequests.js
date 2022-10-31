import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { getUser, fetchUser, getFriends, fetchFriends } from '../../store/users';
import './FriendRequests.css';
import RequestCard from "./RequestCard";

function FriendRequests({ sessionUser }) {
    const dispatch = useDispatch();
    const requestIds = sessionUser.inPending
    const incomingReqs = useSelector(getFriends(requestIds))
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
      
    useEffect(() => {
        dispatch(fetchFriends(sessionUser.id))
        if (!showMenu) return;
    
        const closeMenu = () => {
          setShowMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const incomingRequestCards = Object.values(incomingReqs).map(request => <RequestCard userId={sessionUser.id} request={request} className="reqs"/>)

    return (
        <>
            <button onClick={openMenu} style={{fontSize: "20px", height: "45px", width: "45px"}} className="nav-icon" id="friend-request-icon">
                <i class="fa-solid fa-user-group"></i>
            </button>
            <div id={incomingReqs.length > 0 ? "inc-fr-num" : "no-inc-reqs"}>
                {incomingReqs.length}
            </div>

            {showMenu && (
            <ul id="friend-requests-dropdown">
                {incomingRequestCards.length > 0 ? incomingRequestCards : (<li>No new friends!</li>)}
            </ul>
            )}
        </>
    )
}

export default FriendRequests;