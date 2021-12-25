import User from '../entities/User';
import HttpRequest from '../utils/http-request';

import storage from '../utils/storage';

const Message = {
    getMessageHistory : async (id,page = 0, limit = 10) => {
        return HttpRequest.get(`/messages/rooms/${id}/${page}/${limit}`)
    }
}

export default Message