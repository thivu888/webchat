import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React,{useEffect,useState} from 'react'
import avatarground from '../../static/images/avatarground.png'
import avatarContacts from '../../static/images/avataraddfriend.png'
import useStyle from '../ListConversation/style'
import { ContactsItem } from './ContactsItem'
import { updateTargetContentRight } from '../../actions/Main';
import { useDispatch } from 'react-redux';
import UserService from '../../services/user'

const Container = (props) => {
    
    const classes = useStyle()
    const dispatch = useDispatch()

    const [listUser,setListUser] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        handleCallAPI()
    }, [])

    const handleCallAPI =async () => {
        setLoading(true)
        UserService.getAllUsers().then(res => {
            setLoading(false)
            setListUser([...res.users])
        }).catch(e=>console.log(e))
    }

    const getItem = () =>{
        let list = []
        list = listUser.map((item)=><ContactsItem key={item._id} id={item._id} user={item}/>)
        return list
    }

    const handleRedirectContent = (targetContentRight) => {
        dispatch( updateTargetContentRight(targetContentRight) )
    }

    return (
        <Box className = {classes.container} >
            <Box sx={{borderBottom:'1px solid #dbdbdb'}}>
                <Box className={classes.item_wraper} onClick={() => handleRedirectContent("addfriend")}>
                    <Box className={classes.item_img_wraper}>
                        <Avatar src={avatarContacts} sx={{width:48,height:48}}/>
                    </Box>
                    <Box>
                        <Typography>Danh sách kết bạn</Typography>
                    </Box>
                </Box>

                <Box className={classes.item_wraper}  onClick={() => handleRedirectContent("group")}>
                    <Box className={classes.item_img_wraper}>
                        <Avatar src={avatarground} sx={{width:48,height:48}}/>
                    </Box>
                    <Box>
                        <Typography>Danh sách nhóm</Typography>
                    </Box>
                </Box>
            </Box>
            <Box>
                {getItem()}
            </Box>
        </Box>
    )
}

export  default Container