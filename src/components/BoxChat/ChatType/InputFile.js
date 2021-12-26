import React from 'react'
import { Box } from '@mui/system'
import { InputBase, Typography, } from '@mui/material'
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../actions/socket';
import { updateSendFile } from '../../../actions/Chat';
import useStyle from './style';
import mediaService from '../../../services/media';
import { MessageTypes } from '../../../constant/types';

const InputFile = () => {

    const classes = useStyle()

    const dispatch = useDispatch()

    const handleOnChangeFile = (event) => {
        const targetFile = event.target.files[0]
        console.log(event.target.files)
        if (targetFile && ((/^image\/[a-z0-9]/).test(targetFile.type))) {

            handleSendFile(event.target.files, MessageTypes.IMAGE)
        }
        else if (targetFile && ((/^video\/[a-z0-9]/).test(targetFile.type))) {
            handleSendFile(event.target.files, MessageTypes.VIDEO)
        }
        else {
            alert('File chưa được hỗ trợ')
        }

    }

    const handleSendFile = async (files, file_type) => {
        dispatch(updateSendFile(true))
        const listContent = []
        for (let i = 0; i < files.length; i++) {
            const fileUpload = await mediaService.uploadFile(files[i])
            listContent.push(fileUpload.url)
        }

        const message = {
            type: file_type,
            content: JSON.stringify(listContent),
        }

        dispatch(updateSendFile(false))

        dispatch(sendMessage(message))
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, pl: 1 }}>
            <label htmlFor="ic-camera">
                <Typography className={classes.IconCamera + " " + classes.icon}></Typography>
            </label>
            <input style={{ display: 'none' }} type="file" id="ic-camera" onChange={handleOnChangeFile} accept="video/*" multiple />

            <label htmlFor="ic-img">
                <Typography className={classes.iconPicture + " " + classes.icon}></Typography>
            </label>
            <input style={{ display: 'none' }} type="file" id="ic-img" onChange={handleOnChangeFile} accept=".jpg,.jpeg,.png,video/*" multiple />
        </Box>
    )
}

export default InputFile