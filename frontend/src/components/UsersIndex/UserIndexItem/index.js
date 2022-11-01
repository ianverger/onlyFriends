import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddFriendButton from '../../AddFriendButton';
import './UserIndexItem.css';

const UserIndexItem = ({user, sessionUser}) => {
    const history = useHistory();

    const handleClick = () => {
        const to = `/ProfilePage/${user.id}`;
        history.push(to);
        window.location.reload()
    }
    
    return (
        <div id="index-user-card" onClick={handleClick}>
            <img src={user.profilePicUrl || require('../../../assets/blank_profile_pic.png')} id="selected-user-profile-pic"/>
            <div id="index-user-info">
                <div id="user-info-left">
                    <h4>{`${user.firstName} ${user.lastName}`}</h4>
                    <h6>{user.email}</h6>
                    <h6>{user.birthday}</h6>
                </div>
                <div id="user-info-right">
                </div>
            </div>
        </div>
    )
}

export default UserIndexItem