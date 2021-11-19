import React, {useEffect, useRef, useState} from 'react'
import { Box } from '@mui/system'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import { MessageTypes } from '../../../constant/types'
import { sendMessage, } from '../../../actions/socket'
import { concatChatPool } from '../../../actions/Chat'
import CircularProgress from '@mui/material/CircularProgress';
import Item from '../ChatItem/Container'
import  useStyle from './style'
import { Button } from '@mui/material'
import Loading from '../../Loading'
import ViewFile from '../../ViewImage'
const Container = () => {
    
    const dispatch = useDispatch()

    const scroll = useRef(null)

    const wraper = useRef(null)

    const classes = useStyle()

    const [hasLoadMore,sethasLoadMore] = useState(true)
    const [loading,setLoading] = useState(false)

    const {clientChain,me,you,hasNewMessageToScroll,conversationId,currentLastMessage,isSendingFile,isViewFile} = useSelector(state => state.chatControl)

    const handleOnScroll = (e) => {
        if(!hasLoadMore) {
            return
        }

        if(wraper.current.scrollTop > 50) {
            setLoading(false)
            if(window.messageChainScrolling) {
                clearTimeout(window.messageChainScrolling)
            }
            if(window.messageChainScrolling) {
                clearTimeout(window.loadMessage)
            }
            return
        }

        if (!currentLastMessage) {
            return;
        }

        if(window.messageChainScrolling) {
            clearTimeout(window.messageChainScrolling)
        }

        console.log('SET_TIME_OUT')
        window.messageChainScrolling = setTimeout(() => {
            if (!loading) {
                setLoading(true)
                window.loadMessage = setTimeout(() => {
                    dispatch(concatChatPool({data:[{
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*112000),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*104200),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*124000),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10010),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10500),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10010),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608 + new Date().getTime() + Math.floor(Math.random()*100430),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                },
                {
                    content: "dads"+ Math.floor(Math.random()*1000),
                    message_id: 1637230563608+ new Date().getTime() + Math.floor(Math.random()*10030),
                    roomId: null,
                    type: "TEXT",
                    uerId: "618cc38746a5c0b1260990e1",
                }]}))
                    setLoading(false)
                    console.log(currentLastMessage)
                    if(currentLastMessage){
                        const elm = document.getElementById(currentLastMessage.message_id.toString());
                        if (elm) {
                            elm.scrollIntoView();
                            elm.scrollTo({
                                top: 50,
                                behavior: 'smooth'
                              })
                        }
                    }
                }, 5000);
                
            }
        }, 500);
    }

    const scrollToBottom = () => {
		scroll.current.scrollIntoView({ behavior: "smooth" })
	}

    useEffect(() => {
        if(hasNewMessageToScroll) {
            scrollToBottom()
        }
    },[clientChain.length,clientChain,you])
    
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
        let isReadMessage = true
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
    return (<>
        {isSendingFile ? <Loading open = {isSendingFile} /> : null}
        {isViewFile ? <ViewFile content = {isViewFile} open={!!isViewFile} /> : null}
        <Box id="scrollableDiv" className={classes.container} onScroll={handleOnScroll}  ref={wraper}>
                {loading && <CircularProgress  className={classes.iconLoading}/>}

                { getMessages(clientChain) }

                <Box ref={scroll}/>
        </Box>
        </>
    )
}

export default Container