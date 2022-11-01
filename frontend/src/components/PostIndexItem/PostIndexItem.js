import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import { createLike } from '../../store/posts';
import './PostIndexItem.css';
import EditPostDropdown from './EditPost';
// import EditPostFormModal from '../PostModal/EditPostFormModal';

const PostIndexItem = ({post, sessionUser, pkey}) => {
    const dispatch = useDispatch();
    let userId = post.authorId;
    const selectedUser = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId])

    const handleLike = e => {
        e.preventDefault();
        dispatch(createLike(post.id))
    }

    return (
        <div id="post">
            <div id="top">
                <div id="user-card">
                    {selectedUser && <Link to={`/ProfilePage/${userId}`}><img src={selectedUser.profilePicUrl || require('../../assets/blank_profile_pic.png')} id="selected-user-profile-pic"/></Link>}
                    <div id="user-info">
                        <Link to={`/ProfilePage/${userId}`} id="link-text"><h4>{selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h4></Link>
                        <p>{selectedUser && `${post.createdAt}`}</p>
                    </div>
                </div>
               <EditPostDropdown post={post} sessionUser={sessionUser} pkey={pkey}/>
            </div>
            <p>{post.body}</p>
            <div className="likes">
                <button onClick={handleLike}>
                    <i class="fa-regular fa-heart"></i>
                </button>
                <p>{post.likes && `${post.likes.length} likes`}</p>
            </div>
       </ div>
    )
}

export default PostIndexItem;