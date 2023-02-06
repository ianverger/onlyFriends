import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost } from "../../store/posts";
import DeletePCModal from "../DeletePCModal/DeletePCModal";
import EditPostFormModal from "../PostModal/EditPostFormModal";
import './EditPost.css';

function EditPostDropdown({post, sessionUser, pkey}) {
    const dispatch = useDispatch();

    const handleClick = () => {
        const buttonsDiv = document.getElementById(`${pkey}-ub`);
        const ellipses = document.getElementById(`${pkey}-ellipses`);
        if (buttonsDiv.style.display === "none") {
            buttonsDiv.style.display = "flex"
            ellipses.style.display = "none";
        } else {
            buttonsDiv.style.display = "none"
            ellipses.style.display = "block";
        }
    }

    const handleDeletePost = e => {
        e.preventDefault();
        const postId = post.id;
        return dispatch(deletePost(postId));
    }

    return (
        <div>
            <button onClick={() => handleClick()} className="ellipses" id={`${pkey}-ellipses`}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            <ul id={`${pkey}-ub`} className="update-buttons" style={{display:"none"}}> 
                <EditPostFormModal key="0" post={post} id="edit-post"/>
                <DeletePCModal key="1" post={post}/>
                {/* <button key="1" onClick={handleDeletePost} id="delete-post">Delete</button> */}
            </ul>
          
        </div>
    )
}

export default EditPostDropdown;