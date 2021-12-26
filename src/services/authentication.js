// import moment from 'moment/moment';
import HttpRequest from '../utils/http-request';
import storage, { keys } from '../utils/storage';
import User from '../entities/User';
import {disconnectSocket} from "../utils/socket-io";

const login = async(data) => {
    try{
        const response=await HttpRequest.post(`/users/login`, data)
        window.token = response.token;
        storage.setToken(response.token);
        storage.setUserInfo(new User(response.user))
        window.location.href='/'
        return response;
    }catch(err){
        console.log(err)
    }
   
};

export default {
    async register(data) {
        return HttpRequest.post(`/users`, data).then(response => {
            const user  = {...response.user, ...data};
            window.token = response.token;
            storage.setToken(response.token);
            window.location.href='/'
            storage.setUserInfo(new User(response.user))
            return response;
        }).catch(err => {
            console.log(err)
        });
    },

   async loginUser(userLogin, password,) {
            return await login({ phone: userLogin, password,});
    },

    getUserInfo(id) {
        return HttpRequest.get(`/users/${id}`).then(response => {

            return response;
        });
    },
    
    checkAuth(){
        return HttpRequest.get(`/users/auth/validate`).then(response => {

            return response;
        });
    },

    logOut(){
        storage.destroy();
        window.location.reload()
    },
    
};
