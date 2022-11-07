import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import './CommentIndexItem.css';

const CommentIndexItem = ({comment}) => {
    const dispatch = useDispatch();
    let userId = comment.author_id;
    const selectedUser = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [])

    return (
        <div className="comment-card">
                {selectedUser && <Link to={`/ProfilePage/${userId}`}><img src={selectedUser.profilePicUrl || require('../../assets/blank_profile_pic.png')} id="selected-user-profile-pic"/></Link>}
            <div className="comment-blurb">
                    <Link to={`/ProfilePage/${userId}`} id="link-text"><h5>{selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h5></Link>
                    <p>{comment.body}</p>    
            </div>
                    {/* <p>{selectedUser && `${comment.created_at}`}</p> */}
            <button id="delete-comment-button">
                <span><i class="fa-solid fa-ellipsis"></i></span>
            </button>
        </div>
    )
}

export default CommentIndexItem;