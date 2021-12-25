import React, { useState } from 'react'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {InputBase, } from '@mui/material';
import _ from "lodash"
import UserService from '../../services/user';
const Header = () => {

    const [state,setState] = useState('');

    const handleChangeInput = (e) => {
        handleCallAPI(e.target.value)
    }

    const CallAPI = (value) => {
        UserService.findUsers(0,10,value).then(res => console.log(res))
    }

    const handleCallAPI = _.debounce((value) => CallAPI(value),500)

    return (
        <Box sx={{width:'100%',padding:'20px 0 16px 0',borderBottom:'1px solid #dbdbdb'}}>
                <Box sx={{height:32,display:'flex',alignItems:'center',pl:2,justifyContent:'space-between'}}>
                    <Box sx={{background:'#e8eaef',borderRadius:6,height:'100%',width:'100%'}}>
                        <Box sx={{width:"100%",height:'100%',pl:1,display:'flex'}}>
                            <SearchIcon sx={{position:'relative',top:4}}/>
                            <InputBase onChange={handleChangeInput}/>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center',mr:2}}>
                        <Box sx={{ml:1,mr:2}}>
                            <PersonAddOutlinedIcon/>
                        </Box>
                        <Box>
                            <GroupAddOutlinedIcon/>
                        </Box>
                    </Box>
                </Box>
        </Box>
    )
}

export default Header