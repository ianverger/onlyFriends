import csrfFetch from "./csrf"
import { restoreSession } from "./session";


const RECEIVE_POST = 'posts/receivePost';
const RECEIVE_POSTS = 'posts/receivePosts';
const REMOVE_POST = 'posts/removePost';
const RECEIVE_LIKES = 'posts/receiveLikes'

export const receivePost = post => ({
    type: RECEIVE_POST,
    payload: post 
})

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    payload: posts
})

export const removePost = postId => ({
    type: REMOVE_POST,
    payload: postId
})

export const receiveLikes = post => ({
    type: RECEIVE_LIKES,
    payload: post
})

export const getPost = postId => state => state.posts ? state.posts[postId] : null;
export const getPosts = state => state.posts ? Object.values(state.posts) : [];

export const fetchPost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`);
    const data = await res.json();
    dispatch(receivePost(data.post));
}

export const fetchAllPosts = () => async dispatch => {
    const res = await csrfFetch(`/api/posts`);
    const data = await res.json();
    dispatch(receivePosts(data));
}

export const newPost = (post) => async dispatch => {
    const res = await csrfFetch('/api/posts', {
        method: "POST",
        body: JSON.stringify(post)
    })
    const data = await res.json();
    dispatch(receivePosts(data));
}

export const updatePost = (post) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(post)
    })
    const data = await res.json();
    dispatch(receivePost(data.post));
}

export const deletePost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`, {method: "DELETE"});
    dispatch(removePost(postId));
}

export const createLike = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/likes`, {
        method: "POST"
    })
    const data = await res.json();
    dispatch(receiveLikes(data));
}

export const deleteLike = (postId, likeId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/likes/${likeId}`, {method: "DELETE"});
    const data = await res.json();
    dispatch(receiveLikes(data));
}

export const newComment = (comment) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${comment.post_id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment)
    })
    const data = await res.json();
    dispatch(receiveLikes(data));
}

export const deleteComment = (postId, commentId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {method: "DELETE"});
    const data = await res.json();
    dispatch(receiveLikes(data));
}

const postsReducer = (state = {}, action) => {
    const newState = {...state};
    switch(action.type) {
        case RECEIVE_POST:
            return { ...state, [action.payload.id]: action.payload };
        case RECEIVE_POSTS:
            return { ...state, ...action.payload };
        case REMOVE_POST:
            delete newState[action.payload];
            return newState;
        case RECEIVE_LIKES:
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state; 
    }
}

export default postsReducer;