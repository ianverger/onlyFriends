import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import { createLike, deleteLike } from '../../store/posts';
import { FindLikeId } from '../../utils/findLikeId';
import * as sessionActions from '../../store/session';
import EditPostDropdown from './EditPost';
import './PostIndexItem.css';
// import EditPostFormModal from '../PostModal/EditPostFormModal';

const PostIndexItem = ({post, sessionUser, pkey}) => {
    const dispatch = useDispatch();
    let userId = post.authorId;
    const selectedUser = useSelector(getUser(userId));
    const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId])

    
    const handleLike = e => {
        e.preventDefault();
        dispatch(createLike(post.id)); 
        setLikes(likes + 1);
    }
    
    const handleUnlike = e => {
        e.preventDefault();
        const likeId = FindLikeId(post.likes, post.id, sessionUser.id);
        dispatch(deleteLike(post.id, likeId));
        setLikes(likes - 1);
    }
    
    // useEffect(() => {
    //     dispatch(sessionActions.restoreSession);
    // }, [handleLike, handleUnlike])

    // let likeButton;
    
    // if (post.likes && (FindLikeId(post.likes, post.id, sessionUser.id))) {
    //     likeButton = (
    //         <button className="like-buttons" onClick={handleUnlike}> 
    //             <i style={{fontSize: "14px", color: "white"}} class="fa-solid fa-heart"></i>
    //         </button>
          
    //     )
    // } else {
    //     likeButton = (
    //         <button className="like-buttons" onClick={handleLike}>
    //             <i style={{fontSize: "22px", color: "black"}} class="fa-regular fa-heart"></i>
    //         </button>
    //     )
    // }
  
    // if (!post.likes.length) return null;
    // console.log(post.likes);
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
            <p className="post-body">{post.body}</p>
            <div className="likes-comments">
               {/* <div>{likeButton}</div> */}
               {post.likes && post.likes.length > 0 && <div id="likes-count">
                <button className="like-emoji"> 
                    <i style={{fontSize: "14px", color: "white"}} class="fa-solid fa-heart"></i>
                </button>
                <p>{post.likes.length > 1 ? `${likes} likes` : `${likes} like`}</p>
                </div>}
                <hr className="post-lines" id="top-pl"/>
                <div className="post-buttons">
                    <button className="thumb-button" onClick={handleLike}>
                        <i style={{fontSize: "22px"}} className="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button className="comment-button">
                        <i style={{fontSize: "22px"}} className="fa-regular fa-comment"></i>
                    </button>
                </div>
                <hr className="post-lines"/>
            </div>
       </ div>
    )
}

export default PostIndexItem;