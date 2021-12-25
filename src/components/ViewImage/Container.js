import React from 'react'
import { Backdrop } from '@mui/material'
import { Box } from '@mui/system'
import CancelIcon from '@mui/icons-material/Cancel';
import Image from '../Image'
import { useDispatch } from 'react-redux'
import { updateViewFile } from '../../actions/Chat'
const Container = ({content,open}) => {

    const dispatch = useDispatch()

    const handleCloseViewIMG = () =>{
        dispatch( updateViewFile(null) )
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            
            >
            <Box sx={{width:'60%',height:'80%'}}>
                <CancelIcon sx={{cursor:'pointer'}} onClick={handleCloseViewIMG}/>
                <Image src={content} sx={{objectFit:'contain'}} />
            </Box>
        </Backdrop>
    )
}
 
export default Container