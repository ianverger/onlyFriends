import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../store/users";
import { getUser, fetchUser } from '../../../store/users';
import { Link, Redirect, useParams } from 'react-router-dom';
// import * as sessionActions from "../../../store/session";
import './EditDetailsForm.css';

function EditDetailsForm({setShowModal}) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const selectedUser = useSelector(getUser(userId));
    // const sessionUser = useSelector(state => state.session.user);
    const [relationship, setRelationship] = useState(selectedUser.relationship);
    const [hometown, setHometown] = useState(selectedUser.hometown);
    const [currentCity, setCurrentCity] = useState(selectedUser.currentCity);
    const [education, setEducation] = useState(selectedUser.education);
    const [work, setWork] = useState(selectedUser.work);

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            ...selectedUser,
            relationship, hometown, currentCity, education, work
        }
        user.id = userId;
        dispatch(updateUser(user)).then(setShowModal(false));
    }

    return (
        <div id="edit-details-form">
            <h1>Edit details</h1>
            <hr />
            <br></br>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                className="inputs"
                placeholder="Relationship Status"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                />
                <input type="text" 
                className="inputs"
                placeholder="Hometown"
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
                />
                <input type="text" 
                className="inputs"
                placeholder="Current Residence"
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
                />
                <input type="text" 
                className="inputs"
                placeholder="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                />
                <input type="text" 
                className="inputs"
                placeholder="Place of Work"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                />
                <button id="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default EditDetailsForm;