import React from 'react'
import { Box } from '@mui/system'
import useStyleIMG from '../Image/style'
const Container = (props) => {
    const classes = useStyleIMG()
    return (
        <Box className = {classes.container} sx={{boxShadow: 3, ml: 1}} >
            <video style={{width:'100%',height:'100%',objectFit:'cover'}} controls>
                <source src={props.content}/>
            </video>
        </Box>
    )
}

export  default Container