import React from 'react'
import { Box } from '@mui/system'
import { styled } from '@mui/styles';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar,Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { updateFocusRight } from '../../../actions/Main';
import useStyle from './style';

const ContainerWraper = styled('div')((props) =>({
        height:68,
        background:'#fff',
        display:'flex',
        alignItems:'center',
        width:`calc(100vw - ${props.isDesktop? '401px' : '64px'})`, 
        position:'relative',
        borderBottom:'1px solid #dbdbdb',
}))

const Container = () => {
    const classes = useStyle()  

    const {isDesktop,focusContentRight} = useSelector(state => state.main)

    const dispatch = useDispatch()

    const handleCloseConversation = () => {
        dispatch( updateFocusRight(false) )
    }

    return (
        <ContainerWraper isDesktop={isDesktop} focusContentRight={focusContentRight} >
                {
                    !isDesktop && focusContentRight &&
                    (
                        <Box sx={{ml:2,cursor:'pointer',color:'#dbdbdb'}} onClick={handleCloseConversation}>
                            <ArrowBackIcon/>
                        </Box>
                    )
                }
                
                <Box className={classes.avatarWraper}>
                    <Avatar/>
                </Box>
                <Box sx={{ml:2}}>
                    <Box className={classes.info}>
                        <Typography className={classes.name}>ZaloPay</Typography>
                        <Typography className={classes.timeAgo}>Truy cập 14 phút trước</Typography>
                    </Box>
                </Box>
                <Box className={classes.IconWraper}>
                    <Box>
                        <GroupAddOutlinedIcon/>
                    </Box>
                    <Box>
                        <SearchIcon/>
                    </Box>
                    <Box>
                        <LocalPhoneOutlinedIcon/>
                    </Box>
                    <Box>
                        <VideocamOutlinedIcon/>
                    </Box>
                </Box>
        </ContainerWraper>
    )
}

export default Container