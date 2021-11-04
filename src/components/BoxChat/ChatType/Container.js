import React,{useState} from 'react'
import { Box } from '@mui/system'
import InputBase from '@mui/material/InputBase';
import useStyle from './style';
import { Typography } from '@mui/material';
import {
    sendMessage,
} from '../../../actions/socket';
import { useDispatch } from "react-redux";
import { MessageTypes } from '../../../constant/types';
const Container = () => {
    const dispatch = useDispatch()

    const classes = useStyle()
    const [state, setstate] = useState('')

    const onChangeInput = (e) => {
        setstate(e.target.value)
    }

    const handleSendMessage = () => {
        if(state.length > 0) {

            dispatch(sendMessage({
                content: state,
                type: MessageTypes.TEXT
            }))

            setstate('')
        }
    }

    const onKeyPress = (event) => {
        if(event.keyCode === 13 || event.which === 13) {
            handleSendMessage()
        }
    }
    
    return (
        <Box className={classes.container}>
                <Box>
                    <Box sx={{display:'flex',alignItems:'center',pb:1,pl:1}}>
                        <Typography className={classes.IconCamera +" "+ classes.icon}></Typography>
                        <Typography className={classes.iconPicture +" "+ classes.icon}></Typography>
                    </Box>
                    <Box className={classes.InputWraper }>
                        <InputBase fullWidth placeholder="Type ...." onChange={onChangeInput} value={state} onKeyPress={onKeyPress}/>
                        <Box className={classes.iconSmileWraper}>
                            <Typography className={classes.iconSmile +" "+ classes.icon}></Typography>
                        </Box>
                    </Box>
                    <Box sx={{mr:2}}>
                        <Typography className={classes.iconMic +" "+ classes.icon}></Typography>
                    </Box>
                    <Box>
                        <Box className={classes.WrapSend} onClick={handleSendMessage}>
                            <Typography className={classes.iconSend +" "+ classes.icon}></Typography>
                        </Box>
                    </Box>
                </Box>
        </Box>
    )
}

export default Container