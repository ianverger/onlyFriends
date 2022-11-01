export function FindLikeId (likes, postId, userId) {
    for (let i = 0; i < likes.length; i++) {
        let like = likes[i];

        if ((like.post_id === postId) && (like.user_id === userId)) {
            return like.id;
        }
    }
}