import io from 'socket.io-client';

const connectSocket = () => {
    if (window.socket) {
        return window.socket;
    }
    window.socket = io.connect('https://chat-app-server-hero.herokuapp.com/api/v1');

    return window.socket;
};

export const updateAuthenticate = (userId) => {
    connectSocket();
    window.socket.isAuthenticate = true;
    window.socket.userId = userId;
}

export const disconnectSocket = () => {
    const socket = connectSocket();
    window.socket = undefined;
    socket.disconnect();
};

export default connectSocket