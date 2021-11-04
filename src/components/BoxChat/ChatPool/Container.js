import React from 'react'
import { Box } from '@mui/system'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { MessageTypes } from '../../../constant/types'
import { sendMessage } from '../../../actions/socket'
import Item from '../ChatItem/Container'
const Container = () => {
    
    const dispatch = useDispatch()

    const {clientChain,me,you} = useSelector(state => state.chatControl)

    const  handleReadMessage = () => {
        const now = moment().utc().valueOf();
        const newMessage = {
            userId: me.data._id,
            type: MessageTypes.READ,
            content:now,
        };
        dispatch(sendMessage(newMessage));
    };

    const getMessages = (data) => {
        const listMessage = []
        let lastMessage = null
        let isReadMessage = false
        Object.entries(data).forEach(([key, value]) => {
            lastMessage = value;
            const isOwn = value.userId === me._id

            if (!isOwn && !value.isRead) {
                isReadMessage = false;
            }

            const item = <Item
                key={key.toString()}
                id={value.message_id.toString()}
                type={value.type}
                isOwn={isOwn}
                content={value.content}
                isRead={value.isRead}
                me={me.data}
                you={you.data}
                message={value}
                value={value}
            />;
            listMessage.push(item)
           
        });

        if (!isReadMessage && lastMessage ) {
            handleReadMessage();
        }
        return listMessage
    }

    return (
        <Box sx={{display:'flex',flexDirection:'column',position:'relative',height:'84vh',overflow:'scroll'}}>
            { getMessages(clientChain) }
        </Box>
    )
}

export default Container