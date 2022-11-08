import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LikeIndexItem from './LikeIndexItem';
import './LikesModal.css'

function LikesModal({post}) {
    const [showModal, setShowModal] = useState();

    const likeIndexItems = post.likes.map(like => <LikeIndexItem like={like}/>)
    return (
        <>
        <button id="likes-count" onClick={() => setShowModal(true)}>
                <button className="like-emoji"> 
                    <i style={{fontSize: "14px", color: "white"}} class="fa-solid fa-heart"></i>
                </button>
                <p>{post.likes.length > 1 ? `${post.likes.length} likes` : `${post.likes.length} like`}</p>
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