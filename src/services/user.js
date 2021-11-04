import User from '../entities/User';
import HttpRequest from '../utils/http-request';

import storage from '../utils/storage';

export default {
    getAllUsers(){
        return HttpRequest.get('/users').then(res=>res)
    },

};
