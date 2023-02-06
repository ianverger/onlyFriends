import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewPostForm from './PostForm';
import './EditPostFormModal.css'

function EditPostFormModal({post}) {
  const [showEditModal, setShowEditModal] = useState(); 

  return (
    <>
      <button id="edit-post-button" onClick={() => setShowEditModal(true)}>Edit</button>
      
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <NewPostForm setShowEditModal={setShowEditModal} post={post}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostFormModal;