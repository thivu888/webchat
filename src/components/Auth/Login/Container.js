import {Box,Link,Typography,Select,MenuItem,TextField,ButtonGroup,Button} from '@mui/material'
import { styled } from '@mui/system';
import clsx from 'clsx'
import { useState } from 'react';
import _ from 'lodash';
import useStyle from '../style'
import LoginQR from '../Login_Qr'
import LoginEmail from '../Login_Email'

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

    const [target,setTarget]=useState('maqr')
    const handleChangeTarget=(target)=>{
        setTarget(target)
    }

    return (
        <Container>
            <Box className={classes.title}>
                <Typography >
                    Đăng nhập tài khoản vnChat
                    để kết nối với ứng dụng VNChat
                </Typography>
            </Box>
            <Box className={classes.wraper} sx={{boxShadow:3}}>
                <Box className={classes.header}>
                    <Box className={clsx(target==='maqr'&&classes.active)} onClick={()=>handleChangeTarget('maqr')}>
                        <Typography  >Mã QR</Typography>
                    </Box>
                    <Typography></Typography>
                    <Box className={clsx(target==='sdt'&&classes.active)} onClick={()=>handleChangeTarget('sdt')}>
                        <Typography > Email or SĐT</Typography>
                    </Box>
                </Box>
                
                <Box>
                    {target==='maqr'?
                        <LoginQR/>
                        :
                        <LoginEmail/>
                    }
                </Box>
            </Box>
            <Box className={classes.title}>
                <Typography>Bạn chưa có tài khoản?<Link href='/register'>Đăng kí ngay</Link></Typography>
            </Box>
        </Container>
    );
  }
  
  export default Login;
  