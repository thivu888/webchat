import React from 'react'
import { Box,Avatar, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { updateFocusRight } from '../../actions/Main';
import useStyle from '../ListConversation/style'
import { updateTargetContentRight } from '../../actions/Main';
import { updateconversation } from '../../actions/socket';
import storage from '../../utils/storage';

export const ContactsItem = ({id,user}) => {

    const classes=useStyle()

    const dispatch = useDispatch()

    const me = storage.getUserInfo()

    const handleFocusRight = () => {
        dispatch(updateconversation({
            roomId:[user._id],
            avatars:[user.avatar],
            users:[user],
            name:[user.username],
            updatedAt:  Date.now(),
        }))
        dispatch(updateFocusRight(true))
        dispatch(updateTargetContentRight("message"))
    }

    return (
        <Box className={classes.item_wraper} onClick = {handleFocusRight}>
            <Box className={classes.item_img_wraper}>
                <Avatar sx={{width:48,height:48}} src={user.avatar}/>
            </Box>
            <Box className={classes.item_content_wraper}>
                <Box className={classes.text_wraper}>
                    <Typography >{user.username}</Typography>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', alignItems:'flex-end'}}>
                    <MoreHorizIcon className={classes.icon_more}/>
                </Box>
            </Box>
        </Box> 
    )
}
