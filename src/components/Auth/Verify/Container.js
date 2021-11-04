import {Box,Link,Typography ,MenuItem,TextField,ButtonGroup,Button} from '@mui/material'
import { styled } from '@mui/system';
import { useState, useEffect} from 'react';
import './index.css'
import useStyle from '../style'
import ReactInputVerificationCode from 'react-input-verification-code';
import LoadingButton from '@mui/lab/LoadingButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AuthenService from '../../../services/authentication'
import storage from '../../../utils/storage';
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
    const [value,setValue]=useState('')
    const [loading,setLoding]=useState(false)

    const logOut = () => AuthenService.logOut()

    useEffect(() => {
       if(value.length === 4){
           const val=parseInt(value)
           if(val >= 1000){
               setLoding(true)

               setTimeout(() => {
                setLoding(false)
               },5000)
               
               if(val === 1234){
                    storage.setVerify(true)
                    setLoding(false)
                    window.location.href='/'
               }
           }
       }
    }, [value])
    return (
    <Container>
            <Box className={classes.title}>
                <Typography >
                    Đăng kí tài khoản Zalo
                    để kết nối với ứng dụng Zalo Chat
                </Typography>
            </Box>

            <Box className={classes.wraper} sx={{boxShadow:3}}>
                <Box className="custom-styles">
                    <Box>
                        Nhập mã xác nhận 
                    </Box>

                    <ReactInputVerificationCode onChange={setValue} />
                    <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <Link sx={{display:'flex',alignItems:'center',cursor:'pointer',mt:3,alignSelf:'flex-start',ml:2}}>
                            <Typography>Gửi lại </Typography>
                            <RestartAltIcon/>
                        </Link>
                        <Link sx={{alignSelf:'flex-end',mr:2,cursor:'pointer'}} onClick={logOut}>Thoát</Link>
                    </Box>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        sx={{mt:4,width:120}}
                    >
                        Verify
                    </LoadingButton>
                </Box>
            </Box>
    </Container>
    );
  }
  
  export default Login;
  