import { styled } from '@mui/system'
import React from 'react'
import { Box } from "@mui/system"
import { useSelector } from 'react-redux'
import Popup from '../Common/Popup'
import Header from './Header'
import { Avatar, Button, FormControl, FormControlLabel, InputBase, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useDispatch } from 'react-redux'
import validateTelephone from '../../constant/validateTelephone'
import { updateUserInfo } from '../../actions/Main'
import iconImg from '../../static/images/img_camera.png'
import { useState, useEffect } from 'react'
import MediaService from '../../services/media'
import UserService from '../../services/user'
import Loading from '../Loading'
import { Backdrop } from '@mui/material'
import AddFriendItem from './AddFriendItem'
import _ from "lodash"

const ContainerWraper = styled(Popup)((theme) => ({

}))

const Container = () => {
  const { showFindAddFriend } = useSelector(state => state.main)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [data, setData] = useState([]);

  const handleChangeInput = (e) => {
    handleCallAPI(e.target.value)
  }

  const CallAPI = (value) => {
    UserService.findUsers(0, 10, value).then(res => setData([...res.data]))
  }
  const handleCallAPI = _.debounce((value) => CallAPI(value), 500)

  const getItems = () => {
    return data.map(user =>  <AddFriendItem key={user._id} user = {user} />)
  }


  if (!showFindAddFriend) {
    return <h1></h1>
  }
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!!showFindAddFriend} >
      <Box sx={{ width: 360, height: 615, background: '#fff', borderRadius: 3, p: 1, zIndex: (theme) => theme.zIndex.drawer + 2 }} >
        <Header />
        <Box sx={{ height: 32, display: 'flex', alignItems: 'center', pl: 2, justifyContent: 'space-between' }}>
          <Box sx={{ background: '#e8eaef', borderRadius: 6, height: '100%', width: '100%' }}>
            <Box sx={{ width: "100%", height: '100%', pl: 1, display: 'flex' }}>
              <SearchIcon sx={{ position: 'relative', top: 4 }} />
              <InputBase onChange={(e) => handleChangeInput(e)} onFocus={() => console.log('123')} />
            </Box>
          </Box>
          <h6>Tìm kiếm</h6>
        </Box>
        <Box sx={{ pl: 2, pr: 2, overflow: 'scroll' }}>
         { getItems()}
        </Box>
      </Box>
      {/* {loading && <Loading open = {loading} />} */}
    </Backdrop>
  )
}
export default Container