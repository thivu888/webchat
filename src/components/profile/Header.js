import React from 'react'
import { Box } from "@mui/system"
import { Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
const Header = () => {
    return (
        <Box sx={{width:'100%',height:50, background:'#fff'}}>
            <Box sx={{display:'flex', alignItems:'center',justifyContent:'space-between',p:2}}>
                <Box>
                    <Typography>Thông tin</Typography>
                </Box>
                <Box>
                    <Close/>
                </Box>
            </Box>
        </Box>
    )
}

export default Header