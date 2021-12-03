import User from '../entities/User';
import HttpRequest from '../utils/http-request';

import storage from '../utils/storage';

const UserService = {
    async getAllUsers () {
        return HttpRequest.get('/users').then(res=>res)
    },

    async UpdateUser (id,data) {
        return HttpRequest.put(`/users/${id}`,data).then(res => {
           if(res.success) {
               storage.setUserInfo(data)
           }
           return storage.getUserInfo()
        })
    },

    async getListConverSations (id,page = 0,limit = 10) {
        return HttpRequest.get(`/messages/users/${id}/${page}/${limit}`)
    },

    async getUsersInRoom(id) {
        return HttpRequest.get(`/participants/participants-of-room/${id}`);
    }

};

export default UserService
