import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import avatarground from '../../static/images/avatarground.png'
import avatarContacts from '../../static/images/avataraddfriend.png'
import useStyle from '../ListConversation/style'
import { ContactsItem } from './ContactsItem'
import { updateTargetContentRight } from '../../actions/Main';
import { useDispatch } from 'react-redux';

const Container = () => {

    const classes = useStyle()
    const dispatch = useDispatch()

    const handleRedirectContent = (targetContentRight) => {
        dispatch( updateTargetContentRight(targetContentRight) )
      }

    return (
        <Box className = {classes.container} >
            <Box sx={{borderBottom:'1px solid #dbdbdb'}}>
                <Box className={classes.item_wraper} onClick={() => handleRedirectContent("addfriend")}>
                    <Box className={classes.item_img_wraper}>
                        <Avatar src={avatarContacts} sx={{width:48,height:48}}/>
                    </Box>
                    <Box>
                        <Typography>Danh sách kết bạn</Typography>
                    </Box>
                </Box>

                <Box className={classes.item_wraper}  onClick={() => handleRedirectContent("group")}>
                    <Box className={classes.item_img_wraper}>
                        <Avatar src={avatarground} sx={{width:48,height:48}}/>
                    </Box>
                    <Box>
                        <Typography>Danh sách nhóm</Typography>
                    </Box>
                </Box>
            </Box>
            <Box>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
                <ContactsItem/>
            </Box>
        </Box>
    )
}

export  default Container