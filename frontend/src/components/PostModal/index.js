import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewPostForm from './PostForm';

function NewPostFormModal(props) {
  const [showModal, setShowModal] = useState(); 

  return (
    <>
      <button id="new-post-button" onClick={() => setShowModal(true)}>
      {!props.selectedUser || (props.sessionUser.id === props.selectedUser.id) ? `What's on your mind, ${props.sessionUser.firstName}?` : `Write something to ${props.selectedUser.firstName}?`}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewPostForm />
        </Modal>
      )}
    </>
  );
}

export default NewPostFormModal;