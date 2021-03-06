import React from 'react'
import { Box } from '@mui/system'
import { styled } from '@mui/styles';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar,Typography,AvatarGroup } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { updateFocusRight } from '../../../actions/Main';
import useStyle from './style';
import avatarAddFriend from '../../../static/images/avataraddfriend.png'
import avatar_Group from '../../../static/images/avatarground.png'
import moment from 'moment'
export const ContainerWraper = styled('div')((props) =>{return({
        height:68,
        background:'#fff',
        display:'flex',
        alignItems:'center',
        width:`calc(100vw - 401px)`, 
        [props.theme.breakpoints.down('tablet')]: {
            width:`calc(100vw - 64px)`,
            display :props =>{return `${ props.focus ? 'flex' : 'none'}`},
        },
        position:'relative',
        borderBottom:'1px solid #dbdbdb',
})})

const Container = (props) => {
    const classes = useStyle()  

    const {isDesktop,focusContentRight,targetContentRight} = useSelector(state => state.main)

    const dispatch = useDispatch()

    const handleCloseConversation = () => {
        dispatch( updateFocusRight(false) )
    }

    const {chat, addFriend,user,avatars,name,updatedAt} = props
    return (
        <ContainerWraper focus={focusContentRight} >
                {
                    !isDesktop && focusContentRight &&
                    (
                        <Box sx={{ml:2,cursor:'pointer',color:'#dbdbdb'}} onClick={handleCloseConversation}>
                            <ArrowBackIcon/>
                        </Box>
                    )
                }
                
                { addFriend && targetContentRight === "addfriend" && (<>
                    <Box className={classes.avatarWraper}>
                        <Avatar src={avatarAddFriend}/>
                    </Box>
                    <Typography sx={{fontSize:24,fontWeight:600,ml:2}}>Danh s??ch k???t b???n</Typography>
                    </>)
                }
                { addFriend && targetContentRight === "group" && (<>
                    <Box className={classes.avatarWraper}>
                        <Avatar src={avatar_Group}/>
                    </Box>
                    <Typography sx={{fontSize:24,fontWeight:600,ml:2}}>Danh s??ch nh??m</Typography>
                    </>)
                }
                
                {
                chat && 
                (<>
                {
                    avatars ? (
                        <AvatarGroup max={2}>
                            {avatars.map(item => <Avatar src={item}/>)}
                        </AvatarGroup>
                    ) : (
                    <Box className={classes.avatarWraper}>
                            <Avatar/>
                    </Box>
                    )
                }
                
                <Box sx={{ml:2}}>
                    <Box className={classes.info}>
                        <Typography className={classes.name}>{name}</Typography>
                        <Typography className={classes.timeAgo}>{moment(updatedAt).fromNow()}</Typography>
                    </Box>
                </Box>
                <Box className={classes.IconWraper}>
                    <Box>
                        <GroupAddOutlinedIcon/>
                    </Box>
                    <Box>
                        <SearchIcon/>
                    </Box>
                    <Box>
                        <LocalPhoneOutlinedIcon/>
                    </Box>
                    <Box>
                        <VideocamOutlinedIcon onClick = {() => window.open('/call','name','width=1200,height=800','left:auto')}/>
                    </Box>
                </Box>
                </>
                )
                }

                
        </ContainerWraper>
    )
}

export default Container