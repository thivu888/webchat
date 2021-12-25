import React from 'react'
import { Backdrop } from '@mui/material'
import { CircularProgress } from '@mui/material'
const Container = (props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Container