import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchUser } from '../../store/users';
import './CommentIndexItem.css';
import { deleteComment } from '../../store/posts';

const CommentIndexItem = ({comment, sessionUser}) => {
    const dispatch = useDispatch();
    let userId = comment.author_id;
    const selectedUser = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [])

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


    const handleDeleteComment = e => {
        e.preventDefault();
        dispatch(deleteComment(comment.post_id, comment.id))
    }

    return (
        <div className="comment-card">
            {selectedUser && <Link to={`/ProfilePage/${userId}`}><img src={selectedUser.profilePicUrl || require('../../assets/blank_profile_pic.png')} id="comment-selected-user-profile-pic"/></Link>}
            <div className="comment-blurb">
                <Link to={`/ProfilePage/${userId}`} id="link-text"><h5>{selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h5></Link>
                <p>{comment.body}</p>    
            </div>
            <div className="comment-extras">
                {sessionUser.id === userId && <button onClick={handleDeleteComment} id="delete-comment-button">
                    <span><i className="fa-solid fa-ellipsis"></i></span>
                </button>}
                <p>{getTimeElapsed(comment.created_at)}</p>
            </div>
        </div>
    )
}

export default CommentIndexItem;