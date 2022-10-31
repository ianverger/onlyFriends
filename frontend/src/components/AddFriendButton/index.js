import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { approveFriendRequest, sendFriendRequest } from '../../store/users';
import * as sessionActions from '../../store/session';
import './AddFriendButton.css';

function AddFriendButton({sessionUser, selectedUser}) {
    const dispatch = useDispatch();
    
    const friendIds = sessionUser.friends;
    const outPendIds = sessionUser.outPending;
    const inPendIds = sessionUser.inPending;
    let button;
    
    const handleAdd = () => {
        // e.preventDefault();
        const friendRequest = { requesterId: sessionUser.id, requesteeId: selectedUser.id };
        return dispatch(sendFriendRequest(friendRequest));
    }
    
    const handleApprove = () => {
        const friendRequest = { requesterId: selectedUser.id, requesteeId: sessionUser.id, confirmed: true };
        return dispatch(approveFriendRequest(friendRequest));
    }
    
    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [handleAdd, handleApprove])

    if (friendIds.includes(selectedUser.id)) {
        button = <button id="friends-button">Friends</button>
    } else if (outPendIds.includes(selectedUser.id)) {
        button = <button id="requested-button">Requested</button>
    } else if (inPendIds.includes(selectedUser.id)) {
        button = <button onClick={() => handleApprove} id="approve-request-button">Approve Request</button>
    } else {
        button = <button onClick={() => handleAdd} id="add-friend-button">Add Friend</button>
    }

    return (
        <>
            {button}
        </>
    )
}

export default AddFriendButton;