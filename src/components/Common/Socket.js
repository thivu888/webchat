import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/authentication';
import storage from '../../utils/storage';
import { changeWhoIAm } from '../../actions/Chat';
import history from '../../utils/history';

const  Socket = (props) => {
    useEffect(()=>{
        reloadData()
    },[])
   
const reloadData = () => {

    const token = storage.getToken();
    const user = storage.getUserInfo();
    if (token) {
        AuthService.checkAuth().then((res)=>{
            AuthService.getUserInfo(user._id).then(response => {
                storage.setUserInfo(response.data)
                props.changeWhoIAm({ id: response.data._id, data: response.data });
                // connectSocket();
            });
        })
        // this.handleGetNewMessage();
    } else {
        handleRedirectLogin();
    }
};

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
    filterConversation: state.chatControl.filterConversation,
    arrivedRawMessage: state.chatControl.arrivedRawMessage,
    pendingFileMessage: state.chatControl.pendingFileMessage,
});

const mapDispatchToProps = (dispatch) => ({
    changeWhoIAm: payload => dispatch(changeWhoIAm(payload)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Socket);
