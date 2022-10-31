export function FindFriendshipId (receivedRequests, requesterId, requesteeId) {
    
    
    for (let i = 0; i < receivedRequests.length; i++) {
        let request = receivedRequests[i];
        
        if ((request.requester_id === requesterId ) && (request.requestee_id = requesteeId)) {
            return request.id;
        }
    }
}