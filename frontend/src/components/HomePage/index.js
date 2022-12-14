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

    return (
        <div id="home-page">
            <div id="hp-center">
                <div id="new-post">
                    {sessionUser && <Link to={`/ProfilePage/${userId}`}><img src={profilePicSrc} id="selected-user-profile-pic"/></Link>}
                    <NewPostFormModal sessionUser={sessionUser}/>
                </div>
                {postIndexItems}
            </div>
            <div id="hp-ads">
                <h4>Sponsored</h4>
                <a href="https://ianverger.github.io/Whats-the-vibe-tn/" target="_blank">
                    <h4>What's the vibe tn?</h4>
                    <img src={require('../../assets/vibe_screenshot.png')} ></img>
                    <p>Looking for something to do tonight?</p>
                </a>
                <a href="https://allora.onrender.com/" target="_blank">
                    <h4>Allora</h4>
                    <img src={require('../../assets/Allora_screenshot.jpeg')} ></img>
                    <p>Plan your next trip abroad!</p>
                </a>
            </div>
            <div id="creator-info">
                <h3>Creator:</h3>
                <a href="https://ianverger.com/" target="_blank">
                    <h3>Ian Verger</h3>
                </a>
                <p>Full-stack SWE <br></br>specializing in:</p>
                <p>JavaScript</p>
                <p>React</p>
                <p>Redux</p>
                <p>Express</p>
                <p>Ruby</p>
                <p>Rails</p>
                <p>HTML</p>
                <p>CSS</p>
                <p>SQL</p>
                <p>Node.js</p>
                <p>MongoDB</p>
            </div>
        </div>

    )
}

export default HomePage;