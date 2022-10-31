import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import { getPosts, fetchAllPosts } from '../../store/posts';
import { Link, Redirect } from 'react-router-dom';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import './HomePage.css';
import NewPostFormModal from '../PostModal';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser ? sessionUser.id : null;
    // const selectedUser = useSelector(getUser(userId));
    const allPosts = useSelector(getPosts);
    
    useEffect(() => {
        dispatch(fetchAllPosts());
        dispatch(fetchUser(userId));
        dispatch(sessionActions.restoreSession());
    }, [])
    
    if (!sessionUser) return <Redirect to="/" />
    if (allPosts.length === 0) return null;
    // if (!selectedUser) return null;
    
    const profilePicSrc = sessionUser.profilePicUrl ? sessionUser.profilePicUrl : require('../../assets/blank_profile_pic.png');
    const postIndexItems = allPosts.map((post, idx) => <PostIndexItem key={idx} post={post} sessionUser={sessionUser} pkey={idx} className="posts"/>).reverse();
    // console.log(postIndexItems)
    return (
        <div id="home-page">
            <div id="new-post">
                {sessionUser && <Link to={`/ProfilePage/${userId}`}><img src={profilePicSrc} id="selected-user-profile-pic"/></Link>}
                <NewPostFormModal sessionUser={sessionUser}/>
            </div>
            {postIndexItems}
        </div>

    )
}

export default HomePage;