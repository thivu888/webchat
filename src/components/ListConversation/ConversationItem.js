import { Box,Avatar, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { updateFocusRight } from '../../actions/Main';
import useStyle from "./style"

const Index=()=>{
    const classes=useStyle()

    const dispatch = useDispatch()

    const handleFocusRight = () => {
        dispatch(updateFocusRight(true))
    }

    return(
        <Box className={classes.item_wraper} onClick = {handleFocusRight}>
            <Box className={classes.item_img_wraper}>
                <Avatar sx={{width:48,height:48}}/>
            </Box>
            <Box className={classes.item_content_wraper}>
                <Box className={classes.text_wraper}>
                    <Typography >ZaloPay</Typography>
                    <Typography >Đồng giá 99 xu,hốt ngay voucher</Typography>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', alignItems:'flex-end'}}>
                    <Typography className={classes.time_wraper} sx={{fontSize:14}}>4 giờ</Typography>
                    <MoreHorizIcon className={classes.icon_more}/>
                </Box>
            </Box>
        </Box> 
    )
}

export default Index