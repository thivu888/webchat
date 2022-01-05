import {Box,Typography} from '@mui/material'
import { useState, useEffect } from 'react'
import useStyle from './style'
import Loading from '../Loading'
import QRCode from 'react-qr-code';
import CircularProgress from '@mui/material/CircularProgress';
import connectSocket from '../../utils/socket-io';
import storage from '../../utils/storage';
function Login() {
    const [loading,setLoading]=useState(false)
    const [value,setValue]=useState('p')
    const classes =useStyle()
    useEffect(() => {
        const socket =  connectSocket()
          socket.emit('getQRCODE')
          socket.on('getQRCODE', data=>{
              setValue(data.qrcode)
          })
          socket.on('sCanQRCODE', data=>{
              storage.setUserInfo(data.user.data)
              storage.setToken(data.user.token)
              window.location.reload()
          })
      },[])
    return (
            <Box className={classes.content_qr}>
                <Box className={classes.qr_img}>
                    {!value ?
                    <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',background:'rgba(0,0,0,0.1)'}}>
                        <CircularProgress sx={{mt:10,color:'#fff'}} />
                    </Box>:
                    <QRCode size={230} level="H" value={value} />}
                </Box>
                <Box>
                    <Typography>Quét mã QR bằng Zalo để đăng nhập</Typography>
                </Box>
                {loading&&<Loading open={loading}/>}
            </Box>
    );
  }
  
  export default Login;
  