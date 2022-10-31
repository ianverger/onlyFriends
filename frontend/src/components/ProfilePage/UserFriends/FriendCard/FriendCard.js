import React, { useCallback } from 'react';
import { Link, useHistory} from 'react-router-dom';
import './FriendCard.css';



const FriendCard = ({friend}) => {
    const friendId = friend.id;
    const friendName = `${friend.firstName} ${friend.lastName}`


    const profilePicSrc = friend.profilePicUrl ? friend.profilePicUrl : require('../../../../assets/blank_profile_pic.png');
    return (
        <Link to={`/ProfilePage/${friendId}`} id="friend-card"> 
            <img src={profilePicSrc} id="friend-pic"/>
            <p id="friend-name">{friendName}</p>
        </Link>
    )
}

export default FriendCard;