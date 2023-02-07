import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../store/users";
import { getUser, setUser, fetchUser } from '../../../store/users';
import { Link, Redirect, useParams } from 'react-router-dom';
import './EditProfilePicForm.css';
import csrfFetch from '../../../store/csrf';

function EditProfilePicForm() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const selectedUser = useSelector(getUser(userId));
    const [profilePic, setProfilePic] = useState();
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    const uploadPic = async e => {
        const formData = new FormData();
        if (profilePic) {
            formData.append('user[profilePic]', profilePic);

            const res = await csrfFetch(`/api/users/${selectedUser.id}`, {
                    method: 'PUT',
                    body: formData
                });
            const data = await res.json();
            dispatch(setUser(data.user));
        } else {
            e.preventDefault();
            const errors = document.getElementById("pic-errors");
            errors.id = "pic-errors-active"
        }
    }

    const handleFile = e => {
        const file = e.target.files[0];
        const selectButton = document.getElementById("upload-photo-button");
        const uploadButton = document.getElementById("submit-photo-button-dead");
        const errors = document.getElementById("pic-errors-active")
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setProfilePic(file);
                setProfilePicUrl(fileReader.result);
            }
            if (errors) errors.id = "pic-errors";
            selectButton.id = "upload-photo-button-dead";
            uploadButton.id = "submit-photo-button";
        } 
    }

    const preview = profilePicUrl ? <img src={profilePicUrl} style={{width: "200px"}}/> : null;

    return (
        <>
            <h2 id="h1">Upload profile picture</h2>
            <hr />
            <br></br>
            <div id="pic-errors">No photo selected</div>
            <form onSubmit={uploadPic} id="submit-form">
                <label id="upload-photo-button">
                    Select photo
                    <input type="file" onChange={handleFile} id="upload-photo-input"/>
                </label>   
                <button type="submit" id="submit-photo-button-dead">Upload</button>
            </form>
            <p id="disclaimer">*due to hosting limitations, image upload speeds may lag</p>
            <div id="img-preview" >
                {preview && <h4>Image preview</h4>}
                <br></br>
                {preview}
            </div>
        </>
    )
}

export default EditProfilePicForm;