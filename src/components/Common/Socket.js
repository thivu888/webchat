import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/authentication';
import UserService from '../../services/user';
import storage from '../../utils/storage';
import { changeWhoIAm, updateConversations,pushChatPool } from '../../actions/Chat';
import {tranferCallData, setShowIncomming} from '../../actions/call';
import history from '../../utils/history';
import connectSocket from '../../utils/socket-io';
import _ from "lodash"
let conversationIdCurrent = "";
let HandleUpdateConversationsS = null;
const  Socket = (props) => {
    useEffect(()=>{
        reloadData()

        handleUpdateConversations()
        HandleUpdateConversationsS = _.debounce(() => handleUpdateConversations(),500);
    },[])

    useEffect(()=>{
        conversationIdCurrent = props.conversationId
    },[props.conversationId])
   
const reloadData = () => {

    const token = storage.getToken();
    const user = storage.getUserInfo();
    if (token) {
        AuthService.checkAuth().then((res)=>{
            AuthService.getUserInfo(user._id).then(response => {
                storage.setUserInfo(response.data)
                props.changeWhoIAm({ id: response.data._id, data: response.data });
                connectsocket();
            });
        })
    } else {
        handleRedirectLogin();
    }
};

const handleUpdateConversations = async () => {
    const user = storage.getUserInfo(); 
    UserService.getListConverSations(user._id)
        .then(responseConversation => {
           props.updateConversations(responseConversation)
        }).catch(error => {
            console.log(error)
        })
};

const connectsocket = () =>{
    const currentUser = storage.getUserInfo();
    props.changeWhoIAm({ id: currentUser._id, data: currentUser });
  
    const socket = connectSocket();
    socket.emit('JOIN_ROOM',currentUser._id);

    socket.on('getMessage',data => {
        handleUpdateConversations();
        if(data.roomId === conversationIdCurrent ) {
            props.pushChatPool(data)
        }
    })

    socket.on('resSendMessage',data => {
        // HandleUpdateConversationsS();
    })

    socket.on('call',data => {
    const user = storage.getUserInfo();

        if(data.data.userId._id === user._id){
            props.tranferCallData({
                sessionId: data.sessionId,
                token: data.token,
                data:data
            })
        }else{
            props.setShowIncomming({
                    sessionId: data.sessionId,
                    token: data.token,
                    data:data
                })
        }
        // window.history.pushState({
        //     sessionId: data.sessionId,
        //     token: data.token,
        // }, 'callPage', '/call');
        // HandleUpdateConversationsS();
    })
}

const handleRedirectLogin = () => {
    history.push('/login')
};

return (<></>)
}

const mapStateToProps = (state) => ({
    isSocketNewMessageListenersLoadedFully: state.chatControl.isSocketNewMessageListenersLoadedFully,
    me: state.chatControl.me,
    you: state.chatControl.you,
    clientChain: state.chatControl.clientChain,
    conversationId: state.chatControl.conversationId,
});

const mapDispatchToProps = (dispatch) => ({
    changeWhoIAm: payload => dispatch(changeWhoIAm(payload)),
    updateConversations: payload => dispatch(updateConversations(payload)),
    pushChatPool:payload => dispatch(pushChatPool({message:payload})),
    tranferCallData:payload => dispatch(tranferCallData(payload)),
    setShowIncomming:payload => dispatch(setShowIncomming(payload)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Socket);
