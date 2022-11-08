import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal2() {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button id="add-card" onClick={() => setShowModal(true)}>
        <img src={require('../../assets/add_card.png')} id="add-account-img" alt="add-account-img" />
        <div className="username">Add Account</div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal2;