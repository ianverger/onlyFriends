import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, fetchUser } from '../../store/users';
import './LikesModal.css';

const LikeIndexItem = ({like}) => {
    const dispatch = useDispatch();
    let userId = like.user_id;
    const selectedUser = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [])

    return (
        <div id="like-card">
         {selectedUser && <Link to={`/ProfilePage/${userId}`}><img src={selectedUser.profilePicUrl || require('../../assets/blank_profile_pic.png')} id="comment-selected-user-profile-pic"/></Link>}
         <Link to={`/ProfilePage/${userId}`} id="link-text"><h5>{selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h5></Link>
        </div>
    )
}

export default LikeIndexItem;