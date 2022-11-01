import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { approveFriendRequest, fetchUser, sendFriendRequest, getUser } from '../../store/users';
import * as sessionActions from '../../store/session';
import './AddFriendButton.css';

function AddFriendButton({sessionUser, selectedUser}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser(sessionUser.id));
    const friendIds = currentUser ? currentUser.friends : null;
    const outPendIds = currentUser ? currentUser.outPending: null;
    const inPendIds = currentUser ? currentUser.inPending: null;
    let button;
    
    const handleAdd = e => {
        // e.preventDefault();
        const friendRequest = { requesterId: currentUser.id, requesteeId: selectedUser.id };
        return dispatch(sendFriendRequest(friendRequest));
    }
    
    const handleApprove = e => {
        // e.preventDefault();
        const friendRequest = { requesterId: selectedUser.id, requesteeId: currentUser.id, confirmed: true };
        return dispatch(approveFriendRequest(friendRequest));
    }
    
    useEffect(() => {
        dispatch(fetchUser(sessionUser.id));
    }, [])

    // useEffect(() => {
    //     dispatch(sessionActions.restoreSession());
    // }, [handleAdd, handleApprove])

    if (friendIds && friendIds.includes(selectedUser.id)) {
        button = <button id="friends-button">Friends</button>
    } else if (outPendIds && outPendIds.includes(selectedUser.id)) {
        button = <button id="requested-button">Requested</button>
    } else if (inPendIds && inPendIds.includes(selectedUser.id)) {
        button = <button onClick={handleApprove} id="approve-request-button">Approve Request</button>
    } else {
        button = <button onClick={handleAdd} id="add-friend-button">Add Friend</button>
    }
// debugger

    if (!currentUser) return null;
    
    return (
        <>
        {/* <h1>hi</h1> */}
            {button}
        </>
    )
}

export default AddFriendButton;