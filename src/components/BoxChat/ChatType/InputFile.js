import React from 'react'
import { Box } from '@mui/system'
import { InputBase, Typography, } from '@mui/material'
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../actions/socket';
import { updateSendFile } from '../../../actions/Chat';
import useStyle from './style';
import mediaService from '../../../services/media';
import { FileTypes, MessageTypes } from '../../../constant/types';

const InputFile = () => {

    const classes = useStyle()

   const dispatch = useDispatch()

    const handleOnChangeFile = (event) => {
        const targetFile = event.target.files[0];

        if(targetFile && ((/^image\/[a-z0-9]/).test(targetFile.type))) {
            handleSendFile(targetFile, FileTypes.IMAGE)
        }
        else if(targetFile && ((/^video\/[a-z0-9]/).test(targetFile.type))) {
            handleSendFile(targetFile, FileTypes.VIDEO)
        }
        else {
           alert('File chưa được hỗ trợ')
        }
    }

    const handleSendFile = async (file,file_type) => {
        dispatch( updateSendFile(true) )

        setTimeout(async () => {
            const fileUpload  = await mediaService.uploadFile(file)
            const message = {
                type: MessageTypes.FILE,
                content: fileUpload.url,
                file_type
            }

            dispatch( updateSendFile(false) )
    
            dispatch(sendMessage(message))

        }, 5000);
       

    }

    return (
        <Box sx={{display:'flex',alignItems:'center',pb:1,pl:1}}>
            <label htmlFor="ic-camera">
                <Typography className={classes.IconCamera +" "+ classes.icon}></Typography>
            </label>
            <InputBase sx={{display:'none'}} type="file" id="ic-camera" onChange={handleOnChangeFile} inputProps={{accept:".jpg,.jpeg,.png,video/*"}} />

            <label htmlFor="ic-img">
                <Typography className={classes.iconPicture +" "+ classes.icon}></Typography>
            </label>
            <InputBase sx={{display:'none'}} type="file" id="ic-img" onChange={handleOnChangeFile} inputProps={{accept:".jpg,.jpeg,.png"}}  />
        </Box>
    )
}

export default InputFile