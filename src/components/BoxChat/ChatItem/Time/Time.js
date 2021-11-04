import React, { Component } from 'react';
import { Box } from '@mui/system';


const Time = (props)=> {
        const time=props.sendTime
        return (
            <Box >
                { time.format('HH:mm') }
            </Box>
        );
    }



export default Time;

