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
            // const user  = {...response.data, ...data};
            // window.token = response.refreshToken;
            // storage.setToken(response.refreshToken);
            // response.data = new User(user);
            return response;
        });
    },

   async loginUser(userLogin, password,) {
            return await login({ email: userLogin, password,});
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
