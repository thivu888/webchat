import io from "socket.io-client";
const baseURL = "https://chat-app-server-hero.herokuapp.com";
// const baseURL = "http://10.0.17.105:8080";
const connectSocket = () => {
  if (window.socket) {
    return window.socket;
  }
  window.socket = io.connect(baseURL);

  return window.socket;
};

export const updateAuthenticate = (userId) => {
  connectSocket();
  window.socket.isAuthenticate = true;
  window.socket.userId = userId;
};

export const disconnectSocket = () => {
  const socket = connectSocket();
  window.socket = undefined;
  socket.disconnect();
};

export default connectSocket;
