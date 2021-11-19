import React from 'react'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux';
import { updateViewFile } from '../../../../actions/Chat';
import useStyle from './style';
import Image from '../../../Image'
const Container = (props) => {
    const classes = useStyle({img:props.content})

    const dispatch = useDispatch()

    const handleViewImg = () => {
        dispatch( updateViewFile(props.content) ) 
    }


    return (
        <Box className={classes.container} sx={{ boxShadow: 3}}>
            <Image src={props.content} onClick={handleViewImg} />
        </Box>
    )
}

export default Container