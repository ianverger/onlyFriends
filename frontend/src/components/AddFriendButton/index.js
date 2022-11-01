import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { approveFriendRequest, sendFriendRequest } from '../../store/users';
import * as sessionActions from '../../store/session';
import './AddFriendButton.css';

function AddFriendButton({sessionUser, selectedUser}) {
    const dispatch = useDispatch();
    // const [clicked, setClicked] = useState(false);
    
    const friendIds = sessionUser.friends;
    const outPendIds = sessionUser.outPending;
    const inPendIds = sessionUser.inPending;
    let button;
    
    const handleAdd = e => {
        // e.preventDefault();
        // setClicked(true);
        const friendRequest = { requesterId: sessionUser.id, requesteeId: selectedUser.id };
        // debugger
        return dispatch(sendFriendRequest(friendRequest));
    }
    
    const handleApprove = e => {
        // e.preventDefault();
        // setClicked(true);
        const friendRequest = { requesterId: selectedUser.id, requesteeId: sessionUser.id, confirmed: true };
        return dispatch(approveFriendRequest(friendRequest));
    }
    
    // useEffect(() => {
    //     dispatch(sessionActions.restoreSession());
    // }, [clicked])

    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [handleAdd, handleApprove])

    if (friendIds.includes(selectedUser.id)) {
        button = <button id="friends-button">Friends</button>
    } else if (outPendIds.includes(selectedUser.id)) {
        button = <button id="requested-button">Requested</button>
    } else if (inPendIds.includes(selectedUser.id)) {
        button = <button onClick={handleApprove} id="approve-request-button">Approve Request</button>
    } else {
        button = <button onClick={handleAdd} id="add-friend-button">Add Friend</button>
    }
// debugger
    return (
        <>
        {/* <h1>hi</h1> */}
            {button}
        </>
    )
}

export default AddFriendButton;