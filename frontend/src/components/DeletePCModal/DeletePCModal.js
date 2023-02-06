import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost } from "../../store/posts";
import './DeletePCModal.css'

function DeletePCModal({post}) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(); 

  const handleDeletePost = e => {
    e.preventDefault();
    const postId = post.id;
    return dispatch(deletePost(postId));
  }

  return (
    <>
      <button id="delete-post" onClick={() => setShowDeleteModal(true)}>Delete</button>
      
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h2>Delete Post?</h2>
          {/* {post.body} */}
          <hr />
          <p id="dc-text">Are you sure you want to delete this comment?</p>
          <div id="delete-bottom">
            <button id="no-button"onClick={() => setShowDeleteModal(false)}>No</button>
            <button id="submit-delete-post" onClick={handleDeletePost}>Delete</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeletePCModal;