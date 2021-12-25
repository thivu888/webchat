import {Box,TextField,Button,Link} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LoadingButton from '@mui/lab/LoadingButton';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import authenService from '../../services/authentication';
import useStyle from './style'
import validateEmail from '../../constant/validateEmail'
import validateTelephone from '../../constant/validateTelephone'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import Loading from '../Loading';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
function Index({register}) {
    const classes =useStyle()

    const [dataForm,setDataForm]=useState({
        email:'',
        phone:'',
        password:'',
        username: '',
        confirmpassword:'',
        dataOfBirth: new Date(),
        error:[]
    })
    const [type,setType]=useState('telephone')
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] =useState(null);
    const [loading,setLoading]=useState(false)
    const [error, setError] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);

    const id = canBeOpen ? 'transition-popper' : undefined;

    const onChangeHandle=(e)=>{
        let name=e.target.name
        let value=e.target.value
        if(name==='email'){
            let check=validateEmail.test(value)
            let error=[...dataForm.error]
            if(!check){
                check={
                    type:'email',
                    message:'Sai định dạng email!!!',
                }
                error.push(check)
                setDataForm({...dataForm,[name]:value,error})
            }else{
                error=error.filter(er=>er.type!=='email')
                setDataForm({...dataForm,[name]:value,error})
            }
        }else if(name==='phone'){
            let check=validateTelephone.test(value)
            let error=[...dataForm.error]
            if(!check){
                check={
                    type:'phone',
                    message:'Số điện thoại không đúng!!!',
                }
                error.push(check)
                setDataForm({...dataForm,[name]:value,error})
            }else{
                error=error.filter(er=>er.type!=='phone')
                setDataForm({...dataForm,[name]:value,error})
            }
        }else if(name==='confirmpassword'||(name==='password'&&dataForm.confirmpassword)){
            let check=dataForm.password===value
            if(name==='password'){
                check=dataForm.confirmpassword===value
            }
            let error=[...dataForm.error]
            if(!check){
                check={
                    type:'confirmpassword',
                    message:'Mật khẩu không khớp!!!',
                }
                error.push(check)
                setDataForm({...dataForm,[name]:value,error})
            }else{
                error=error.filter(er=>er.type!=='confirmpassword')
                setDataForm({...dataForm,[name]:value,error})
            }
        }else{
            setDataForm({...dataForm,[name]:value})
        }
    }

    const handleChangeDate = (e) =>{
        setDataForm({...dataForm,dataOfBirth:e.getTime()})
    }

    const handleSubmit=(e)=>{
        if(register){
            if(dataForm.error.length===0){
            setLoading(true)
                authenService.register({...dataForm})
                .then(()=> setLoading(false))
                .catch(()=> {
                    setLoading(false)
                })
                return;
            }
            return
        }else{
            if(dataForm.error.length===0){
                setLoading(true)
                authenService.loginUser(dataForm.email,dataForm.password)
                .then((e)=> {
                    setLoading(false)
                })
                .catch(()=> {
                    setLoading(false)
                })
                return;
            }
        }

    }

    const handleOnPressKey = (event)=>{
        if(event.keyCode === 13 || event.which === 13) {
            handleSubmit()
        }
    }

    const resetDataForm=()=>{
        setDataForm({
            email:'',
            phone:'',
            password:'',
            username:'',
            confirmpassword:'',
            error:[]
        })
    }
    return (
            <Box className={classes.content} >
                {register && (
                    <>
                        <Box>
                            <Button sx={{outline:'none',border:'none',pr:4}} size="small" variant='outlined' ><PersonOutlineIcon sx={{mt:2}}/></Button>
                            <TextField onKeyPress={handleOnPressKey} sx={{width:'100%',ml:1}} name="username" label="Username" variant="standard" required value={dataForm.username}  onChange={onChangeHandle}/>
                        </Box>
                        <Box>
                            <Button sx={{outline:'none',border:'none',pr:4}} size="small" variant='outlined' ><DateRangeOutlinedIcon sx={{mt:2}}/></Button>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DesktopDatePicker
                                value = {dataForm.dataOfBirth}
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => <TextField {...params} />}
                                name = "date"
                                onChange={handleChangeDate}
                                />
                             </LocalizationProvider>
                        </Box>
                    </>
                )}
                <Box >
                    <Button onClick={handleClick} sx={{outline:'none',border:'none',mt:2}} size="small" variant='outlined' endIcon={<ArrowDropDownIcon />}>{type==='email'?<EmailOutlinedIcon />:<PhoneIphoneOutlinedIcon/>}</Button>
                    <Popper className={classes.transition_popper} id={id} open={open} anchorEl={anchorEl} transition>
                        {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box>
                                <Box>
                                    <EmailOutlinedIcon onClick={()=>{setType('email');setOpen(false);resetDataForm()}}/>
                                    <PhoneIphoneOutlinedIcon onClick={()=>{setType('phone');setOpen(false);resetDataForm()}} />
                                </Box>
                            </Box>
                        </Fade>
                        )}
                    </Popper>
                    {type==="email"?
                        <TextField onKeyPress={handleOnPressKey} error={!!dataForm.error.find(eror=>eror.type=='email')} helperText={dataForm.error.find(er=>er.type=='email')?.message} sx={{width:'100%',ml:1}} name="email" label="Email" variant="standard" required value={dataForm.email}  onChange={onChangeHandle}/>
                        :
                        <TextField onKeyPress={handleOnPressKey} error={!!dataForm.error.find(eror=>eror.type=='phone')} helperText={dataForm.error.find(er=>er.type=='phone')?.message} sx={{width:'100%',ml:1}} name="phone" label="phone" variant="standard" required value={dataForm.phone}  onChange={onChangeHandle}/>
                    }
                </Box>
                <Box >
                    <Button sx={{outline:'none',border:'none',pr:4}} size="small" variant='outlined' ><LockOutlinedIcon sx={{mt:2}}/></Button>
                    <TextField onKeyPress={handleOnPressKey} sx={{width:'100%',ml:1}} type="password" name="password" label="Password" variant="standard" value={dataForm.password} onChange={onChangeHandle} />
                </Box>
                {register&&
                <Box >
                    <Button sx={{outline:'none',border:'none',pr:4}} size="small" variant='outlined' ><LockOutlinedIcon sx={{mt:2}}/></Button>
                    <TextField  onKeyPress={handleOnPressKey} sx={{width:'100%',ml:1}} error={!!dataForm.error.find(eror=>eror.type=='confirmpassword')} helperText={dataForm.error.find(er=>er.type=='confirmpassword')?.message} type="password" name="confirmpassword" label="confirmpassword" variant="standard" required value={dataForm.confirmpassword} onChange={onChangeHandle} />
                </Box>
                }
                {
                   error && ( register ? 'Đăng kí thất bại' : 'Đăng nhập thất bại' )
                }
                <Box sx={{mt:2}}>
                    <LoadingButton sx={{mx:'auto',width:'50%'}} variant="contained" loading={!true} loadingPosition="end" onClick={handleSubmit}>{register?"Đăng kí":"Đăng nhập"}</LoadingButton>
                </Box>
               {!register&&
               <Box >
                    <Link sx={{mt:3,mx:'auto'}}>Quên mật khẩu?</Link>
                </Box>
                }
                {loading&&<Loading open={loading}/>}
            </Box>
    );
  }
  
  export default Index;
  