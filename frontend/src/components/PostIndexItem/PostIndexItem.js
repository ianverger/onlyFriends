import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import { createLike, deleteLike, newComment, deleteComment, getPost, fetchPost } from '../../store/posts';
import { FindLikeId } from '../../utils/findLikeId';
import { UserLiked } from '../../utils/userLiked';
import * as sessionActions from '../../store/session';
import EditPostDropdown from './EditPost';
import CommentIndexItem from './CommentIndexItem';
import './PostIndexItem.css';
import LikesModal from './LikesModal';
// import EditPostFormModal from '../PostModal/EditPostFormModal';

const PostIndexItem = ({post, sessionUser, pkey}) => {
    const dispatch = useDispatch();
    let userId = post.authorId;
    const selectedUser = useSelector(getUser(userId));
    const [commentBody, setCommentBody] = useState("");

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId])

    
    // makes milliseconds to easy-readable string
    const formatDateTime = ms => {
        const sec = Math.floor(ms / 1000)
        if (sec < 60) return `${sec}s`
        const min = Math.floor(sec / 60)
        if (min < 60) return `${min}m`
        const hr = Math.floor(min / 60)
        if (hr < 24) return `${hr}h`
        const day = Math.floor(hr / 24)
        if (day < 7) return `${day}d`
        const week = Math.floor(day / 7)
        return `${week}w`
    }
    
    const getTimeElapsed = from => {
        const previous = new Date(from);
        const now = new Date(); // get current datetime
        const comparedTime = (now.valueOf() - previous.valueOf());
        // get compared time in "milliseconds"
    
        return formatDateTime(comparedTime)
    }

    // timer sourced from : https://stackoverflow.com/questions/60936672/javascript-count-up-timer-from-timestamp-in-rows-column

    const handleLike = e => {
        e.preventDefault();
        dispatch(createLike(post.id)); 
    }
    
    const handleUnlike = e => {
        e.preventDefault();
        const likeId = FindLikeId(post.likes, post.id, sessionUser.id);
        dispatch(deleteLike(post.id, likeId));
    }

    const submitComment = e => {
        e.preventDefault();
        const newCommentSubmit = { body: commentBody, author_id: sessionUser.id, post_id: post.id };
        dispatch(newComment(newCommentSubmit));
        setCommentBody("")
    }

    let likeButton;
    
    if (post.likes && !UserLiked(post.likes, sessionUser.id)) {
        likeButton = (
            <button className="thumb-button" onClick={handleLike}>
                <i style={{fontSize: "22px"}} className="fa-regular fa-thumbs-up"></i>
            </button>
        )
    } else {
        likeButton = (
            <button className="thumb-button" onClick={handleUnlike}>
                <i style={{fontSize: "22px"}} className="fa-solid fa-thumbs-up"></i>
            </button>
        )
    }

    const showNewComment = e => {
        const newCommentInput = document.getElementById(`${pkey}-new-comment`)
        if (newCommentInput.style.display === "none") {
            newCommentInput.style.display = "block";
        } else {
            newCommentInput.style.display = "none";
        }
    }

    const commentIndexItems = post.comments.map((comment, idx) => <CommentIndexItem key={idx} comment={comment} sessionUser={sessionUser}/>)

    return (
        <div id="post">
            <div id="top">
                <div id="user-card">
                    {selectedUser && <Link to={`/ProfilePage/${userId}`}><img src={selectedUser.profilePicUrl || require('../../assets/blank_profile_pic.png')} id="selected-user-profile-pic"/></Link>}
                    <div id="user-info">
                        <Link to={`/ProfilePage/${userId}`} id="link-text"><h4>{selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h4></Link>
                        {/* <p>{selectedUser && `${post.createdAt}`}</p> */}
                        <p>{getTimeElapsed(post.createdAt)}</p>
                    </div>
                </div>
               {sessionUser.id === userId && <EditPostDropdown post={post} sessionUser={sessionUser} pkey={pkey}/>}
            </div>
            <p className="post-body">{post.body}</p>
            <div className="likes-comments">
               {post.likes && post.likes.length > 0 && <LikesModal post={post}/>}
                <hr className="post-lines" id="top-pl"/>
                <div className="post-buttons">
                    {likeButton}
                    <button className="comment-button" onClick={showNewComment}>
                        <i style={{fontSize: "22px"}} className="fa-regular fa-comment"></i>
                    </button>
                </div>
                <hr className="post-lines"/>
                <div className="comments-area">
                    <div id={`${pkey}-new-comment`} className="n-c-d" style={{display: "none"}}>
                    <form onSubmit={submitComment} className="new-comment"  >
                        <textarea name="new-comment" value={commentBody} id="comment-text-area" cols="30" rows="1" 
                        onChange={e => setCommentBody(e.target.value)}/>
                        <input type="submit" value="submit" id="new-comment-submit-button" />
                    </form>
                    </div>
                    <div className="comments-index">
                        {post.comments && commentIndexItems}
                    </div>
                </div>
            </div>
       </ div>
    )
}

export default PostIndexItem;