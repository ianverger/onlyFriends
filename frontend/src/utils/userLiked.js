export function UserLiked (likes, userId) {
    for (let i = 0; i < likes.length; i++) {
        let like = likes[i];
        
        if (like.user_id === userId) return true;
    }
    return false;
}