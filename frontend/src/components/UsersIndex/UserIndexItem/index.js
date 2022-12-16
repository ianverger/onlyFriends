import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddFriendButton from '../../AddFriendButton';
import './UserIndexItem.css';

const UserIndexItem = ({user, sessionUser}) => {
    const history = useHistory();
    const friendIds = sessionUser ? sessionUser.friends : null;
    const outPendIds = sessionUser ? sessionUser.outPending: null;
    const inPendIds = sessionUser? sessionUser.inPending: null;

    const handleClick = (user) => {
        // const to = `/ProfilePage/${user.id}`;
        history.push(`/ProfilePage/${user.id}`);
        // window.location.reload()
    }

    let friendStatus;

    if (friendIds && friendIds.includes(user.id)) {
        friendStatus = <div id="status-f">Friends</div>
    } else if (outPendIds && outPendIds.includes(user.id)) {
        friendStatus = <div id="status-r">Requested</div>
    } else if (inPendIds && inPendIds.includes(user.id)) {
        friendStatus = <div id="status-p">Pending</div>
    }
    
    return (
        <div id="index-user-card" onClick={(e) => handleClick(user)}>
            <img src={user.profilePicUrl || require('../../../assets/blank_profile_pic.png')} id="selected-user-profile-pic"/>
            <div id="index-user-info">
                <div id="user-info-left">
                    <h4>{`${user.firstName} ${user.lastName}`}</h4>
                    <h6>{user.email}</h6>
                    <h6>{user.birthday}</h6>
                </div>
                <div id="user-info-right">
                    {/* <AddFriendButton sessionUser={sessionUser} selectedUser={user}/> */}
                    {friendStatus}
                </div>
            </div>
        </div>
    )
}

export default UserIndexItem