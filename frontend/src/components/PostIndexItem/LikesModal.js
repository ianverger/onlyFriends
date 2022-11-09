import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LikeIndexItem from './LikeIndexItem';
import './LikesModal.css'

function LikesModal({post}) {
    const [showModal, setShowModal] = useState();

    const likeIndexItems = post.likes.map((like, idx) => <LikeIndexItem key={idx} like={like}/>)
    return (
        <>
        <button id="likes-count" onClick={() => setShowModal(true)}>
            <div className="like-emoji"> 
                <i style={{fontSize: "14px", color: "white"}} className="fa-solid fa-heart"></i>
            </div>
            <p id="likes-count-text">{post.likes.length > 1 ? `${post.likes.length} likes` : `${post.likes.length} like`}</p>
        </button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div>
                    <h2>Likes</h2>
                    <div className="likes-list">{likeIndexItems}</div>
                </div>
            </Modal>
        )}
        </>
    );
}

export default LikesModal;