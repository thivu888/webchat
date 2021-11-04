import {Box,Link,Typography} from '@mui/material'
import { styled } from '@mui/system';
import { useState } from 'react';
import useStyle from '../style'
import LoginEmail from '../Login_Email'
import authenService from '../../../services/authentication';
export const Container=styled('div')({
    position:'fixed',
    top:'0',
    left:'0',
    bottom:'0',
    right:'0',
    background:'rgba(0,0,0,0.3)',
    zIndex:'99'
})



function Login() {
    const classes =useStyle()

    return (
        <Container>
            <Box className={classes.title}>
                <Typography >
                    Đăng kí tài khoản Zalo
                    để kết nối với ứng dụng Zalo Chat
                </Typography>
            </Box>
            <Box className={classes.wraper} sx={{boxShadow:3}}>
                <Box>
                    <LoginEmail register/>
                </Box>
            </Box>
            <Box className={classes.title}>
                <Typography>Bạn đã có tài khoản?<Link href='/login'>Đăng nhập</Link></Typography>
            </Box>
        </Container>
    );
  }
  
  export default Login;
  