import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../store/users';
import { newPost, updatePost } from '../../store/posts'
import './PostForm.css';

function NewPostForm({post, setShowModal, setShowEditModal}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id; 
    const selectedUser = useSelector(getUser(userId));
    const [body, setBody] = useState(post ? post.body : "");
    const [edit, setEdit] = useState(post ? true : false);

    const handleNewSubmit = e => {
        e.preventDefault();
        const newPostSubmit = { body, author_id: userId };
        return dispatch(newPost(newPostSubmit)).then(setTimeout(() => {setShowModal(false)}, 800));
    };

    const handleUpdate = e => {
        e.preventDefault();
        const updatePostSubmit = { id: post.id, body };
        return dispatch(updatePost(updatePostSubmit)).then(setTimeout(() => {setShowEditModal(false)}, 800));
    }

    return (
        <form onSubmit={edit ? handleUpdate : handleNewSubmit} id="form">
        <h2>{edit ? 'Edit' : 'Create'} post</h2>
        <hr />
        <div id="user-card">
            {selectedUser && <img src={selectedUser.profilePicUrl || require('../../assets/blank_profile_pic.png')} id="selected-user-profile-pic"/>}
            <h4>{selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}</h4>
        </div>
        <textarea name="new-post" placeholder={`What's on your mind, ${selectedUser.firstName}?`} id="text-area" cols="30" rows="10" value={body}
        onChange={e => setBody(e.target.value)} />
        <button type="submit" id="post-button">Post</button>
       
        </form>
    );
}

export default NewPostForm;