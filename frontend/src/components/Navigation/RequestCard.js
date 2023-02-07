import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchUser, approveFriendRequest, denyFriendRequest } from '../../store/users';
import * as sessionActions from '../../store/session';
import './RequestCard.css';

const RequestCard = ({userId, request}) => {
    const dispatch = useDispatch();
    const requesteeId = userId;
    const requesterId = request.id;
    const requesterName = `${request.firstName} ${request.lastName}`
    
    const handleApprove = e => {
        const friendRequest = { requesterId: requesterId, requesteeId: requesteeId, confirmed: true };
        return dispatch(approveFriendRequest(friendRequest));
    }
    
    const handleDeny = e => {
        const friendRequest = { requesterId: requesterId, requesteeId: requesteeId };
        return dispatch(denyFriendRequest(friendRequest));
    }

    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [handleApprove, handleDeny])

    return (
        <div>
            <div id="requester-card">
                <img src={request.profilePicUrl ? request.profilePicUrl : require('../../assets/blank_profile_pic.png')} id="dropdown-request-icon"/>
                <p>{requesterName}</p>
            </div>
            <div id="buttons">
                <button onClick={handleApprove} id="approve-button">Approve</button>
                <button onClick={handleDeny} id="deny-button">Deny</button>
            </div>
        </div>
    )
}

export default RequestCard;