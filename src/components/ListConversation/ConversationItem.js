import { Box,Avatar, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import TimeAgo from 'react-time-ago'
import { useDispatch } from 'react-redux';
import { updateFocusRight, updateTargetContentRight } from '../../actions/Main';
import useStyle from "./style"
import storage from '../../utils/storage'
import { updateconversation } from '../../actions/socket';
import moment from 'moment'
const Index=(props)=>{

    const {value} = props

    const {avatar, name, content, updatedAt} = value

    const classes=useStyle()

    const me = storage.getUserInfo()

    const dispatch = useDispatch()

    const handleFocusRight = () => {
        dispatch(updateconversation({
            roomId:value._id,
            avatars:avatar,
            name:name,
            updatedAt
        }))
        dispatch(updateFocusRight(true))
        dispatch(updateTargetContentRight("message"))
    }

    return(
        <Box className={classes.item_wraper} onClick = {handleFocusRight}>
            <Box className={classes.item_img_wraper}>
                <Avatar sx={{width:48,height:48}} src={avatar}/>
            </Box>
            <Box className={classes.item_content_wraper}>
                <Box className={classes.text_wraper}>
                    <Typography >{name}</Typography>
                    <Typography >{content}</Typography>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', alignItems:'flex-end'}}>
                    <Typography className={classes.time_wraper} sx={{fontSize:14}}>{moment(updatedAt).fromNow()}</Typography>
                    <MoreHorizIcon className={classes.icon_more}/>
                </Box>
            </Box>
        </Box> 
    )
}

export default Index