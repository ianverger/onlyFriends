import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditProfilePicForm from './EditProfilePicForm';

function EditProfilePicModal({selectedUser, sessionUser}) {
    const [showPicModal, setShowPicModal] = useState(false);

    return (
      <>
        <button id="edit-profile-pic-button" onClick={() => setShowPicModal(true)} style={{fontSize: "25px", height: "42px", width: "42px", backgroundColor: "#EFEFEF"}}>
          <i className="fa-solid fa-camera"></i>
        </button>
       
        {showPicModal && (
            <Modal onClose={() => setShowPicModal(false)}>
                <EditProfilePicForm />
            </Modal>
        )}
      </>
    );
}

export default EditProfilePicModal