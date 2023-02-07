import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditDetailsForm from './EditDetailsForm';

function EditDetailsModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button id="edit-details-button" onClick={() => setShowModal(true)}>Edit details</button>
      
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditDetailsForm setShowModal={setShowModal}/>
            </Modal>
        )}
      </>
    );
}

export default EditDetailsModal;