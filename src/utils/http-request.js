import axios from 'axios';
import Popup from 'react-popup';

import storage from './storage';
import { disconnectSocket } from './socket-io';

const http = axios.create({
    method: 'post', // default
    baseURL: 'https://chat-app-server-hero.herokuapp.com/api/v1',
    json: true,
});

http.interceptors.request.use((config) => {
    const newConfig = config;
        const token = window.token || storage.getToken();
        if (token && token !== 'undefined' && token !== 'null') {
            newConfig.headers.Authorization = `Bearer ${token}`;
        }
    return newConfig;
}, (error) => Promise.reject(error));

http.interceptors.response.use((response) => {
    return response.data
}, async(errors) => {
    if(errors.response?.status === 401){
        storage.destroy();
        localStorage.clear();
        // disconnectSocket();
       window.location.reload();
    }   
    console.log(errors)
    return Promise.reject(errors); // eslint-disable-line
});


export default http;
