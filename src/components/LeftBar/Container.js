import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useStyle from './style';
import storage from '../../utils/storage'
import authentication from '../../services/authentication';
import { useDispatch } from 'react-redux';
import { updateTargetContent, updateUserInfo,updateTargetContentRight } from '../../actions/Main';
const Container=styled('div')(({theme})=>({
    position:'fixed',
    width:64,
    top:0,
    left:0,
    bottom:0,
    backgroundColor:theme.palette.primary.main,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    '&::-webkit-scrollbar':{
      width: 5,
    },
    '&>button':{
      width:64,
      height:64,
      backgroundColor:'inherit',
      cursor:'pointer',
      '&:hover':{ 
        backgroundColor:"#ffffff40",
      },
      '&:focus':{
        backgroundColor:theme.palette.primary.dark,
      },
      '&>svg':{
        display:'block',
        margin:'16px auto',
      }
    }
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const Index=()=>{

    const user = storage.getUserInfo()
    const classes = useStyle()

    const dispatch = useDispatch()
  
    const [anchorEl, setAnchorEl] =React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickSetting=(event)=>{
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleRedirectInfoUser = () => {
      return  console.log('redirect')
    }

    const handleRedirectContent = (target,content) => {
      dispatch( updateTargetContent(target) )
      dispatch( updateTargetContentRight(content))
    }

    const handleShowInfo = () => {
      dispatch( updateUserInfo(user) )
    }


    const logOut = () => authentication.logOut()

    
    

    return(
        <Container>
            <StyledBadge sx={{mt:3}} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" onClick={handleRedirectInfoUser}>
                <Avatar sx={{width:48,height:48}} src={user.avatar}/>
            </StyledBadge>
            <Button sx={{mt:4}} onClick = {() => handleRedirectContent("message"," ")}>
                <ChatIcon sx={{width:32,height:32,color:'white'}}/>
            </Button>
            <Button onClick = {() => { handleRedirectContent("contacts","addfriend"); } }>
                <AssignmentIndOutlinedIcon sx={{width:32,height:32,color:'white'}}/>
            </Button>
            <Button onClick = {() => handleRedirectContent("notify","")}>
              <Badge badgeContent={4} color="secondary">
                  <NotificationsNoneOutlinedIcon sx={{width:32,height:32,color:'white'}}/>
              </Badge>
            </Button>
            <Button sx={{mt:6}} id="setting" onClick={handleClickSetting}>
                <SettingsPowerIcon sx={{width:32,height:32,color:'white'}}/>
            </Button>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'setting',
              }}
            >
              <MenuItem onClick={handleClose} sx={{fontSize:15}} onClick={handleShowInfo}>
                <AccountCircleOutlinedIcon className={classes.menu_item_icon}/>
                <Typography className={classes.menu_item_text}>T??i kho???n</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{fontSize:15}}>
                <SettingsOutlinedIcon className={classes.menu_item_icon}/>
                <Typography className={classes.menu_item_text}>C??i ?????t</Typography>
              </MenuItem>
              <hr/>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
        </Container>
    )
}

export default Index