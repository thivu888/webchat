import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { Button, InputBase, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import _ from "lodash"
import UserService from '../../services/user';
import { updateShowAddFriend, updateShowAddGroup } from '../../actions/Main';
const Header = (props) => {
    const dispatch = useDispatch()
    const [state, setState] = useState('');

    const handleChangeInput = (e) => {
        handleCallAPI(e.target.value)
    }

    const CallAPI = (value) => {
        UserService.findUsers(0, 10, value).then(res => props.setListUser([...res.data]))
    }

    const handleShowAddFriend = () => {
        dispatch( updateShowAddFriend(true))
    }

    const handleupdateShowAddGroup = () => {
        dispatch( updateShowAddGroup(true))
    }

    const handleCallAPI = _.debounce((value) => CallAPI(value), 500)
    
    return (
        <Box sx={{ width: '100%', padding: '20px 0 16px 0', borderBottom: '1px solid #dbdbdb' }}>
            <Box sx={{ height: 32, display: 'flex', alignItems: 'center', pl: 2, justifyContent: 'space-between' }}>
                <Box sx={{ background: '#e8eaef', borderRadius: 6, height: '100%', width: '100%' }}>
                    <Box sx={{ width: "100%", height: '100%', pl: 1, display: 'flex' }}>
                        <SearchIcon sx={{ position: 'relative', top: 4 }} />
                        <InputBase onChange={handleChangeInput} onFocus={() => props.setFinding(true)} />
                    </Box>
                </Box>
                {
                    props.finding ? 
                        <CancelOutlinedIcon sx={{fill: '#0091ff'}} onClick={() => props.setFinding(false)}/>
                        :
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <Box sx={{ ml: 1, mr: 2 }}>
                                <PersonAddOutlinedIcon  onClick={handleShowAddFriend}/>
                            </Box>
                            <Box>
                                <GroupAddOutlinedIcon onClick ={handleupdateShowAddGroup}/>
                            </Box>
                        </Box>
                    }
                
            </Box>
        </Box>
    )
}

export default Header