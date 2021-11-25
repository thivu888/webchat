import { styled } from '@mui/system'
import React from 'react'
import { Box } from "@mui/system"
import { useSelector } from 'react-redux'
import Popup from '../Common/Popup'
import Header from './Header'
import { Avatar, Button, InputBase, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { InputOutlined } from '@mui/icons-material'
import DatePicker from '@mui/lab/DatePicker';
const ContainerWraper = styled(Popup)((theme) => ({

}))



const Container = () => {
    const {userInfo} = useSelector(state => state.main)

    return (
        <ContainerWraper>
            <Header/>
            <Box sx={{width:'100%', height:180}}>
                <img style={{width:'100%', objectFit:'cover', height:'100%'}} src="https://cover.talk.zdn.vn/default"/>
            </Box>
            <Box sx={{width:'100%',height:84, position:'relative', mt:'-40px'}}>
                <Avatar sx={{width:80,height:80, margin:'0 auto',}}/>
            </Box>
            <Box sx={{height:335, p:1}}>
                <Box sx={{display:'flex', flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography sx={{textAlign:'center',width:'60%',height:30,fontSize:17,fontWeight:500, color:'#001a33', margin:'0 auto',outline:'none'}} contentEditable="true">Phan Quang Vũ</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left'}}>Số điện thoại</Typography>
                        <InputBase 
                            disabled
                            defaultValue="0345475176"
                            fullWidth 
                            sx={{background:'#f4f5f7'}}
                            />
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left'}}>Email</Typography>
                        <InputBase 
                            disabled
                            defaultValue="bopy197xx@gmail.com"
                            fullWidth 
                            sx={{background:'#f4f5f7'}}
                            />
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left'}}>Ngày Sinh</Typography>
                        <DatePicker
                            disableFuture
                            label="Ngày sinh"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left'}}>Giới tính</Typography>
                        <InputBase value="bopy197xx@gmail.com" />
                    </Box>
                    <Box sx={{alignSelf:'flex-end', mb:2}}>
                        <Button>Hủy</Button>
                        <Button>Cập nhật</Button>
                    </Box>
                </Box>
            </Box>
        </ContainerWraper>
    )
}
export  default Container