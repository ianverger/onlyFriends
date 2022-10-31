import React, { useEffect, useState, useRef } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import { getUser, getFriends, fetchUser, setUser, fetchFriends } from '../../store/users';
import { getPosts, fetchAllPosts } from '../../store/posts';
import EditProfilePicModal from './EditProfilePicModal';
import EditDetailsModal from './EditDetailsModal';
import { updateUser } from '../../store/users';
import AddFriendButton from '../AddFriendButton';
import UserFriends from './UserFriends/UserFriends';
import NewPostFormModal from '../PostModal';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import './ProfilePage.css';


function ProfilePage() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const selectedUser = useSelector(getUser(userId));
    const friends = useSelector(getFriends(selectedUser ? selectedUser.friends : []));
    const sessionUser = useSelector(state => state.session.user);
    const [bio, setBio] = useState("");
    const allPosts = useSelector(getPosts);

    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchFriends(userId));
        dispatch(sessionActions.restoreSession());
        dispatch(fetchAllPosts());
    }, [])

    if (!sessionUser) return <Redirect to="/" />
    if (!selectedUser) return null;

    const bioHandleClick = e => {
        setBio(selectedUser.bio)
        const bioInput = document.getElementById("bio");
        const editButton = document.getElementById("edit-bio-button");
        if (bioInput.style.display === "none") {
            bioInput.style.display = "block";
            editButton.style.display = "none";
        } else {
            bioInput.style.display = "none";
            editButton.style.display = "block";
        }
    }

    const bioHandleSubmit = e => {
        e.preventDefault();
        const user = {
            ...selectedUser,
            bio
        }
        user.id = userId;
        dispatch(updateUser(user));
        bioHandleClick();
    }

    if (!selectedUser.friends) return null;

    const profilePicSrc = selectedUser.profilePicUrl ? selectedUser.profilePicUrl : require('../../assets/blank_profile_pic.png');
    const wallPosts = allPosts.filter(post => String(post.authorId) === userId);
    const wallPostIndexItems = wallPosts.map(post => <PostIndexItem post={post} sessionUser={sessionUser} className="posts"/>).reverse();
    
    return (
        <div id="profile-page">
            <div id="profile-header-backdrop">
            <div id="profile-header">
                {selectedUser && <img src={profilePicSrc} id="profile-pic" alt="profile-pic"/>}
                {(sessionUser.id === selectedUser.id) && <div id="edit-pic-div"><EditProfilePicModal selectedUser={selectedUser} sessionUser={sessionUser} id="edit-profile-pic-button"/></div>}
                {(sessionUser.id !== selectedUser.id) && <div id="edit-profile-pic-placeholder"/>}
                <div id="user-name">
                    <h1>{selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h1>
                    <p>{selectedUser && `${selectedUser.friends.length} friends`}</p>
                </div>
                <div id="add-friend-button-div">
                    {(sessionUser.id !== selectedUser.id) && <AddFriendButton sessionUser={sessionUser} selectedUser={selectedUser}/>}
                </div>
            </div>
            </div>

            <div id="body" >
                <div id="left" >
                    <div id="intro" className="profile-divs">
                        <h3>Intro</h3>
                        {selectedUser && <p>{selectedUser.bio}</p>}
                        {(selectedUser.bio && (sessionUser.id !== selectedUser.id)) && <hr id="bio-line" />}
                        <div id="EBD" className="button-divs">{(sessionUser.id === selectedUser.id) && <button id="edit-bio-button" onClick={bioHandleClick}>Edit bio</button>}</div>
                        <form id="bio" onSubmit={bioHandleSubmit} style={{display: "none"}}>
                            <textarea name="bio" id="bio-text-input" value={bio} 
                            onChange={e => setBio(e.target.value)}/>
                            <div><input id="save-button" type="submit" value="Save" /></div>
                        </form>
                        
                       
                        {selectedUser && 
                        <>
                        {selectedUser.relationship && <div className="intro-info">
                            <i style={{color: "rgb(164, 162, 162)", fontSize: "20px", height: "20px", width: "20px"}} className="fa-solid fa-heart"></i>
                            <p className="intro-info-text">{selectedUser.relationship}</p>
                        </div>}  
                        {selectedUser.work && <div className="intro-info">
                            <i style={{color: "rgb(164, 162, 162)", fontSize: "20px", height: "20px", width: "20px"}} className="fa-solid fa-briefcase"></i>
                            <p className="intro-info-text">{selectedUser.work}</p>
                        </div>} 
                        {selectedUser.education && <div className="intro-info">
                            <i style={{color: "rgb(164, 162, 162)", fontSize: "20px", height: "20px", width: "20px"}} className="fa-solid fa-graduation-cap"></i>
                            <p className="intro-info-text">{selectedUser.education}</p>
                        </div>} 
                        {selectedUser.currentCity && <div className="intro-info">
                            <i style={{color: "rgb(164, 162, 162)", display: "flex", justifyContent: "center", fontSize: "20px", height: "20px", width: "20px"}} className="fa-solid fa-location-dot"></i>
                            <p className="intro-info-text">{selectedUser.currentCity}</p>
                        </div>} 
                        {selectedUser.hometown && <div className="intro-info">
                            <i style={{color: "rgb(164, 162, 162)", fontSize: "20px", height: "20px", width: "20px"}} className="fa-solid fa-house" ></i>
                            <p className="intro-info-text">{selectedUser.hometown}</p>
                        </div>}  
                        </>
                        }
                  
                        <div className="button-divs">{(sessionUser.id === selectedUser.id) && <EditDetailsModal id="edit-details-button"/>}</div>
                    </div>
                        
                    <div id="friends" className="profile-divs">
                       {selectedUser && <UserFriends friends={friends}/>}
                    </div>
                </div>

                <div id="right">
                    <div id="new-post-profile" className="profile-divs">
                         {sessionUser && <img src={profilePicSrc} id="new-post-profile-pic" alt="profile-pic"/>}
                         <NewPostFormModal sessionUser={sessionUser} selectedUser={selectedUser}/>
                    </div>
                        {wallPostIndexItems} 
                </div>
            </div>
           

        </div>

         
    
        
    )
}

export default ProfilePage;