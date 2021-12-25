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

    const getContent = (content) =>{
        console.log(value)
        const me = storage.getUserInfo()
        if(value.type === 'image') {
            if(me._id == value.sender._id) {
                return <Typography >Bạn đã gửi cho bạn một ảnh</Typography>
            }
            return <Typography >{name} đã gửi cho bạn một ảnh</Typography>
        }
        if(value.type === 'video') {
            if(me._id == value.sender._id) {
                return <Typography >Bạn đã gửi cho bạn một video</Typography>
            }
            return <Typography >{name} đã gửi cho bạn một video</Typography>
        }
        return <Typography >{content}</Typography>
    }

    return(
        <Box className={classes.item_wraper} onClick = {handleFocusRight}>
            <Box className={classes.item_img_wraper}>
                <Avatar sx={{width:48,height:48}} src={avatar}/>
            </Box>
            <Box className={classes.item_content_wraper}>
                <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                    <Typography >{name}</Typography>
                    <Typography className={classes.time_wraper} sx={{fontSize:14}}>{moment(updatedAt).fromNow()}</Typography>

                </Box>
                <Box sx={{display:'flex', justifyContent: 'space-between'}} className={classes.text_wraper}>
                   { getContent(content) }
                    <MoreHorizIcon className={classes.icon_more}/>
                </Box>
            </Box>
        </Box> 
    )
}

export default Index