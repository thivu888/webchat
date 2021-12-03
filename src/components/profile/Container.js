import {  styled } from '@mui/system'
import React from 'react'
import { Box } from "@mui/system"
import { useSelector } from 'react-redux'
import Popup from '../Common/Popup'
import Header from './Header'
import { Avatar, Button, FormControl, FormControlLabel, InputBase, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useDispatch } from 'react-redux'
import validateTelephone from '../../constant/validateTelephone'
import { updateUserInfo } from '../../actions/Main'
import iconImg  from '../../static/images/img_camera.png'
import { useState, useEffect } from 'react'
import MediaService from '../../services/media'
import UserService from '../../services/user'
import Loading from '../Loading'

const ContainerWraper = styled(Popup)((theme) => ({

}))



const Container = () => {
    const {userInfo} = useSelector(state => state.main)
    const dispatch = useDispatch()

    const [state,setState] = useState(null)
    const [loading,setLoading] = useState(false)

    const handleOnChangeFile = (event) => {
        const targetFile = event.target.files[0];
        const urlAvatarUpdate = URL.createObjectURL(targetFile)
        setState({...state, avatar:urlAvatarUpdate, file:targetFile})
    }

    const handleChangeInput = (event) => {
        const name = event.target.name 
        const value = event.target.value
        setState({...userInfo, [name]:value })
    }

    const handleChangeDate = (e) =>{
        setState({...userInfo,dataOfBirth:e.getTime()})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let checkPhone = true

        if((state.phone !== "" ) && userInfo.phone === "") {
            checkPhone = validateTelephone.test(state.phone)
        }

        if(!checkPhone) {
            alert('có lỗi xảy ra')
            return
        }
        let userRespone = null
        try{
            setLoading(true)
            if(state.file) {
                const res = await MediaService.uploadFile(state.file)
                 
                 userRespone = await UserService.UpdateUser(state._id,{...state, avatar:res.url})
            }
            else {
                 userRespone = await UserService.UpdateUser(state._id,state)
            }
            setLoading(false)
            dispatch( updateUserInfo(userRespone) )
            setState(state => ({...state,file:null}))
        }
        catch(er){
            console.log(er)
        }
        
        
    }


    const handleCloseUserInfo = () => {
        dispatch( updateUserInfo(null) )
    }

    useEffect(() => {
        setState( userInfo)
    },[userInfo,userInfo?._id])

    if(!userInfo || !state) return <></>
    return (
        <ContainerWraper>
            <Header/>
            <Box sx={{width:'100%', height:180}}>
                <img style={{width:'100%', objectFit:'cover', height:'100%'}} src="https://cover.talk.zdn.vn/default"/>
            </Box>
            <Box sx={{width:'100%',height:84, position:'relative', mt:'-40px'}}>
                <Avatar sx={{width:80,height:80, margin:'0 auto',}} src={state?.avatar}/>
                <label htmlFor="changeAvatar" style = {{position:'absolute',left:'54%',top:'58px',cursor:'pointer',}}>
                    <img src={iconImg} alt="avatar" />
                </label>
                <InputBase sx={{display:'none'}} type="file" id="changeAvatar" onChange={handleOnChangeFile} inputProps={{accept:".jpg,.jpeg,.png"}}  />
            </Box>
            <Box sx={{height:335, p:1}}>
                <Box sx={{display:'flex', flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                    <Box sx={{textAlign:'center'}}>
                        <InputBase inputProps = {{style:{textAlign:'center',width:'100%',height:30,fontSize:17,fontWeight:500, color:'#001a33', margin:'0 auto',outline:'none'}}} name="username" onChange={handleChangeInput} value={state?.username} />
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left'}}>Số điện thoại</Typography>
                        <InputBase 
                            name = "phone"
                            disabled = {userInfo.phone ? true : false}
                            defaultValue={state?.phone}
                            fullWidth 
                            sx={{background:'#f4f5f7'}}
                            onChange={handleChangeInput}
                            />
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left'}}>Email</Typography>
                        <InputBase 
                            name = "email"
                            disabled = {userInfo?.email ? true : false}
                            defaultValue={state?.email}
                            fullWidth 
                            sx={{background:'#f4f5f7'}}
                            onChange={handleChangeInput}
                            />
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left'}}>Ngày Sinh</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DesktopDatePicker
                            value={state?.dataOfBirth}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} />}
                            onChange={handleChangeDate}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:14, fontWeight:400,color:'#001a33', textAlign:'left',mt:1}}>Giới tính</Typography>
                        <Box sx = {{textAlign:'center'}}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="gender" name="gender" value={state?.gender} onChange={handleChangeInput}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{alignSelf:'flex-end', mb:2}}>
                        <Button sx={{mr:2}} onClick={handleCloseUserInfo}>Hủy</Button>
                        <Button variant="contained" onClick = {handleSubmit}>Cập nhật</Button>
                    </Box>
                </Box>
            </Box>
            {loading && <Loading open = {loading} />}
        </ContainerWraper>
    )
}
export  default Container