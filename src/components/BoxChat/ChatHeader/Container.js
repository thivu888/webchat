import React from 'react'
import { Box } from '@mui/system'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Avatar,Typography } from "@mui/material"
import useStyle from './style';
const Container = () => {
    const classes = useStyle()
    return (
        <Box className={classes.container}>
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
           </Box>
    )
}

export default Container