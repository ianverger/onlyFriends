import React, { useCallback, useEffect, useState } from 'react';
import FriendCard from './FriendCard/FriendCard';
import './UserFriends.css';


const UserFriends = ({friends}) => {
    const friendCards = Object.values(friends).map((friend, idx) => <FriendCard key={idx} friend={friend}/>)
    
    return (
        <div id="friends-div">
            <h3>Friends</h3>
            {friends.length > 0 && <div id="friend-cards">{friendCards}</div>}
        </div>
    ) 
}

export default UserFriends;