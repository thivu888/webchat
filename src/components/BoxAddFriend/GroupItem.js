import React from 'react'
import { Box } from '@mui/system'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Grid } from '@mui/material';
import useStyle from './style'

export const GroupItem = () => {

    const classes = useStyle()


    return (
        <Grid item mobile={12} mobileplus={6} tablet={6}  desktop={3}>
            <Card sx={{position:'relative', width: 250, height: 250,background:'#fff', display:'flex', flexDirection:'column',alignItems:'center', margin:'16px auto' }}>
                <CancelOutlinedIcon sx={{position: 'absolute', top:6, right:6, color:'gray',zIndex:'1000',cursor:'pointer'}}/>
                <Box sx={{width:100,height:100}}>
                    <AvatarGroup max={3} className={classes.avatar_Group_3}>
                        <Avatar sx={{width:54, height:54, mt:3}} src="https://s240-ava-talk.zadn.vn/6/5/e/5/28/240/cdab6add8df7bdeebc3f321cd727dbd7.jpg"/>
                        <Avatar sx={{width:54, height:54, mt:3}} src="https://s240-ava-talk.zadn.vn/6/5/e/5/28/240/cdab6add8df7bdeebc3f321cd727dbd7.jpg"/>
                        <Avatar sx={{width:54, height:54, mt:3}} src="https://s240-ava-talk.zadn.vn/6/5/e/5/28/240/cdab6add8df7bdeebc3f321cd727dbd7.jpg"/>
                    </AvatarGroup>
                </Box>
                <Box>
                    <Typography sx={{fontSize:'14px',mt:8, color:'#72808e'}}>3 thành viên</Typography>
                </Box>
            </Card>
        </Grid>
    )
}
