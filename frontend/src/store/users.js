import csrfFetch from "./csrf"

const SET_USER = 'users/setUser'
const RECEIVE_USERS = 'users/receiveUsers'

export const setUser = user => ({
    type: SET_USER,
    payload: user
})

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    payload: users
})

export const getUser = userId => state => state.users ? state.users[userId] : null;
export const getAllUsers = state => state.users ? Object.values(state.users) : []; 
export const getFriends = (friends) => state => {
    let friendUsers = [];

    if (!state.users) {
        return friendUsers;
    } else {
        Object.values(state.users).forEach(user => {
            if (friends?.includes(user.id)) {
                friendUsers.push(user);
            }
        })
    }
    return friendUsers;
}

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(setUser(data.user));
}

export const fetchFriends = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/friendships?userId=${userId}`);
    const data = await res.json();
    dispatch(receiveUsers(data));
}

export const fetchAllUsers = () => async dispatch => {
    const res = await csrfFetch(`/api/users`);
    const data = await res.json();
    dispatch(receiveUsers(data));
}

export const updateUser = (user) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user)
    })
    const data = await res.json();
    dispatch(setUser(data.user));
}

export const sendFriendRequest = friendRequest => async dispatch => {
    const res = await csrfFetch('/api/friendships', {
        method: 'POST',
        body: JSON.stringify(friendRequest)
    })
    const data = await res.json();
    dispatch(receiveUsers(data));
}

export const approveFriendRequest = friendRequest => async dispatch => {
    const res = await csrfFetch(`/api/friendships/${friendRequest.id}`, {
        method: 'PUT',
        body: JSON.stringify(friendRequest)
    })
    const data = await res.json();
    dispatch(receiveUsers(data));
}

export const denyFriendRequest = friendRequest => async dispatch => {
    const res = await csrfFetch(`/api/friendships/${friendRequest.id}`, {
        method: 'DELETE',
        body: JSON.stringify(friendRequest)
    })
    const data = await res.json();
    dispatch(receiveUsers(data));
}

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, [action.payload.id]: action.payload };
        case RECEIVE_USERS:
            return { ...state, ...action.payload};
        default:
            return state;
    }
}

export default usersReducer;