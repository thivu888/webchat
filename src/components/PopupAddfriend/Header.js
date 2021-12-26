import React from 'react'
import { Box } from "@mui/system"
import { Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useDispatch } from 'react-redux'

import { updateShowAddFriend } from '../../actions/Main'
const Header = () => {
    const dispatch = useDispatch()

    const handleCloseShowAddFriend = () => {
        dispatch( updateShowAddFriend(false) )
    }

    return (
        <Box sx={{width:'100%',height:50, background:'#fff'}}>
            <Box sx={{display:'flex', alignItems:'center',justifyContent:'space-between',p:2}}>
                <Box>
                    <Typography>Thêm bạn</Typography>
                </Box>
                <Box sx={{cursor:'pointer'}} onClick={() => handleCloseShowAddFriend()} >
                    <Close/>
                </Box>
            </Box>
        </Box>
    )
}

export default Header