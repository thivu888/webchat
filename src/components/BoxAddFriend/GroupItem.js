import React from 'react'
import { Box } from '@mui/system'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Grid } from '@mui/material';
import useStyle from './style'
import storage from '../../utils/storage';

export const GroupItem = ({item}) => {
    const user = storage.getUserInfo();
    const classes = useStyle()


    return (
        <Grid item mobile={12} mobileplus={6} tablet={6}  desktop={4} desktopplus={3}>
            <Card sx={{position:'relative', width: 250, height: 250,background:'#fff', display:'flex', flexDirection:'column',alignItems:'center', margin:'16px auto' }}>
                <CancelOutlinedIcon sx={{position: 'absolute', top:6, right:6, color:'gray',zIndex:'1000',cursor:'pointer'}}/>
                <Box sx={{width:100,height:100}}>
                    <AvatarGroup max={3} >
                        <Avatar sx={{width:54, height:54, mt:3}} src={user.avatar}/>
                        {item?.avatar?.map( avatar => <Avatar sx={{width:54, height:54, mt:3}} src={avatar}/>)}
                    </AvatarGroup>
                </Box>
                <Box>
                    <Typography sx={{fontSize:'14px',mt:8, color:'#72808e'}}>{item?.avatar?.length +1} thành viên</Typography>
                </Box>
            </Card>
        </Grid>
    )
}
