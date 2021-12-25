import React from 'react'
import { Box } from '@mui/system'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Grid } from '@mui/material';
const AddFriendItem = ({user}) => {
    return (

        <Grid item mobile={12} mobileplus={6} tablet={6}  desktop={4} desktopplus={3}>
            <Card sx={{position:'relative', width: 250, height: 250,background:'#fff', display:'flex', flexDirection:'column',alignItems:'center', margin:'16px auto' }}>
                <CancelOutlinedIcon sx={{position: 'absolute', top:6, right:6, color:'gray',zIndex:'1000',cursor:'pointer'}}/>
                <Box>
                    <Avatar sx={{width:96, height:96, mt:3}} src={user.avatar}/>
                </Box>
                <Box>
                    <Typography sx={{fontSize:'16px', fontWeight:'600', height:'25px', mt:1, padding:'0 16px'}}>{user.username}</Typography>
                </Box>
                <Button sx={{mt:3}} variant="outlined">Kết bạn</Button>   
            </Card>
        </Grid>
        
    )
}

export default AddFriendItem