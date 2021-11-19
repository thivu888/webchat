import React from 'react'
import { Box } from '@mui/system'
import useStyleIMG from '../Image/style'
const Container = (props) => {
    const classes = useStyleIMG()
    return (
        <Box className = {classes.container} >
            <video style={{width:'100%',height:'100%',objectFit:'cover'}} controls>
                <source src={props.content}/>
            </video>
        </Box>
    )
}

export  default Container