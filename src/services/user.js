import User from '../entities/User';
import HttpRequest from '../utils/http-request';

import storage from '../utils/storage';

const UserService = {
    async getAllUsers () {
        return HttpRequest.get('/users').then(res=>res)
    },

    async getFriends (id) {
        return HttpRequest.get(`/users/friend/${id}`).then(res=>res)
    },

    async addFriend (data) {
        return HttpRequest.post(`/friends`,data).then(res=>res)
    },

    async cancelAddFriend (userId,friendId) {
        return HttpRequest.post(`/friend/cancel/${userId}/${friendId}`).then(res=>res)
    },

    async checkIsFriend(userId,friendId) {
        return HttpRequest.post(`/users/friend/${userId}/${friendId}`).then(res=>res)
    },

    async getRequestFriends(id) {
        return HttpRequest.post(`/users/friend-request/${id}`).then(res=>res)
    },

    async findUsers (page = 0,limit = 10,search = ' ') {
        return HttpRequest.get(`/users/${page}/${limit}?search=${search}`).then(res=>res)
    },

    async UpdateUser (id,data) {
        return HttpRequest.put(`/users/${id}`,data).then(res => {
           if(res.success) {
               storage.setUserInfo(data)
           }
           return storage.getUserInfo()
        })
    },

    async getListConverSations (id,page = 0,limit = 20) {
        return HttpRequest.get(`/messages/users/${id}/${page}/${limit}`)
    },

    async getUsersInRoom(id) {
        return HttpRequest.get(`/participants/participants-of-room/${id}`);
    },


};

export default UserService
