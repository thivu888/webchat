import { Box } from "@mui/system"
import ListConversation from '../ListConversation/Container'
import SearchIcon from '@mui/icons-material/Search';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {InputBase, } from '@mui/material';

const Index=()=>{
    
    return(
        <Box sx={{position:'relative',left:64}}>
            <Box sx={{position:'fixed', width:336,top:0,bottom:0,background:'#fff',borderRight:'1px solid #dbdbdb',cursor:'pointer'}}>
                <Box sx={{width:'100%',padding:'20px 0 16px 0'}}>
                    <Box sx={{height:32,display:'flex',alignItems:'center',pl:2}}>
                        <Box sx={{background:'#e8eaef',borderRadius:6,height:'100%'}}>
                            <Box sx={{width:234,height:'100%',pl:1,display:'flex'}}>
                                <SearchIcon sx={{position:'relative',top:4}}/>
                                <InputBase/>
                            </Box>
                        </Box>
                        <Box sx={{ml:1,mr:2}}>
                            <PersonAddOutlinedIcon/>
                        </Box>
                        <Box>
                            <GroupAddOutlinedIcon/>
                        </Box>
                    </Box>
                </Box>
                <hr/>
                <Box>
                    <ListConversation/>
                </Box>
            </Box>
        </Box>
    )
}

export default Index