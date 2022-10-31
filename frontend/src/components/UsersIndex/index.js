import React, { useEffect, useState, useRef } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, getAllUsers } from '../../store/users';
import UserIndexItem from './UserIndexItem';
import './UsersIndex.css';

function UsersIndex() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser ? sessionUser.id : null;
    const allUsers = useSelector(getAllUsers);

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, []);
   
    const allUserCards = allUsers.map((user, idx) => <UserIndexItem key={idx} sessionUser={sessionUser} user={user}/>)
    return (
        <div id="u-i-p">
            <div id="uip-title">
                <h2>OnlyFriends users:</h2>
            </div>
            <div id="users-index">
                {allUserCards}
            </div>
        </div>
    )
}

export default UsersIndex;