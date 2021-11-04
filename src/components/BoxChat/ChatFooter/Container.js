import React from 'react'
import { Box } from '@mui/system'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import useStyle from './style';
const Container = () => {
    const classes = useStyle()
    return (
    <Box className={classes.container} >
        <Box >
            <Box sx={{pt:1,ml:2,mr:2}}>
                <ImageOutlinedIcon sx={{width:28,height:28}}/>
            </Box>
            <Box sx={{pt:1}}>
                <AttachmentOutlinedIcon sx={{width:28,height:28}}/>
            </Box>
        </Box>
   </Box>
    )
}

export default Container