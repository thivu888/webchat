import React, {useEffect, useRef, useState} from 'react'
import { Box } from '@mui/system'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import { MessageTypes } from '../../../constant/types'
import { sendMessage, } from '../../../actions/socket'
import { concatChatPool,loadChatPool } from '../../../actions/Chat'
import CircularProgress from '@mui/material/CircularProgress';
import Item from '../ChatItem/Container'
import  useStyle from './style'
import { Button } from '@mui/material'
import Loading from '../../Loading'
import ViewFile from '../../ViewImage'
import MessageService from '../../../services/message'
const Container = () => {
    
    const dispatch = useDispatch()

    const scroll = useRef(null)

    const wraper = useRef(null)

    const classes = useStyle()

    const [hasLoadMore,sethasLoadMore] = useState(true)

    const [loading,setLoading] = useState(false)

    const {clientChain,me,yous,hasNewMessageToScroll,conversationId,currentLastMessage,isSendingFile,isViewFile} = useSelector(state => state.chatControl)

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

        window.messageChainScrolling = setTimeout(() => {
            if (!loading) {
                setLoading(true)
                handleCallAPI(0,20).then(data => {
                    dispatch(concatChatPool({data:data}))
                    setLoading(false)
                    if(currentLastMessage){
                        const elm = document.getElementById(currentLastMessage._id.toString());
                        if (elm) {
                            elm.scrollIntoView();
                            elm.scrollTo({
                                top: 50,
                                behavior: 'smooth'
                                })
                        }
                    }
                }).catch(error => {
                    setLoading(false)
                })
            }
        }, 500);
    }

    const scrollToBottom = () => {
		scroll.current.scrollIntoView({ behavior: "smooth" })
	}

    useEffect(() => {

        dispatch(loadChatPool({data:[]}))

        async function fetchData() {
            const data = await handleCallAPI()
            dispatch(loadChatPool({data}))

          }
          fetchData();
       

    },[conversationId])

    useEffect(() => {
        if(hasNewMessageToScroll) {
            scrollToBottom()
        }
    },[clientChain.length,clientChain,yous,conversationId])
    
    const  handleReadMessage = () => {
        const now = moment().utc().valueOf();
        const newMessage = {
            userId: me.data._id,
            type: MessageTypes.READ,
            content:now,
        };
        dispatch(sendMessage(newMessage));
    };

    const handleCallAPI = async (page = 0,limit = 10) => {
     const {data} = await MessageService.getMessageHistory(conversationId,page,limit);
        return data
    }

    const getMessages = (data) => {
        const listMessage = []
        let lastMessage = null
        let isReadMessage = true
        Object.entries(data).forEach(([key, value]) => {
            lastMessage = value;
            const isOwn = value.userId._id === me.data._id
            const avatar = value.userId.avatar
            if (!isOwn && !value.isRead) {
                isReadMessage = false;
            }

            const item = <Item
                key={key.toString()}
                id={value._id.toString()}
                type={value.type}
                isOwn={isOwn}
                content={value.content}
                isRead={value.isRead}
                me={me.data}
                you={yous[value._id]}
                message={value}
                value={value}
                avatar = {avatar}
            />;
            listMessage.push(item)
           
        });

        // if (!isReadMessage && lastMessage ) {
        //     handleReadMessage();
        // }
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