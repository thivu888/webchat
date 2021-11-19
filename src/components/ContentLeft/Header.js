import React from 'react'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {InputBase, } from '@mui/material';

const Header = () => {
    return (
        <Box sx={{width:'100%',padding:'20px 0 16px 0'}}>
                <Box sx={{height:32,display:'flex',alignItems:'center',pl:2,justifyContent:'space-between'}}>
                    <Box sx={{background:'#e8eaef',borderRadius:6,height:'100%',width:'100%'}}>
                        <Box sx={{width:"100%",height:'100%',pl:1,display:'flex'}}>
                            <SearchIcon sx={{position:'relative',top:4}}/>
                            <InputBase/>
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