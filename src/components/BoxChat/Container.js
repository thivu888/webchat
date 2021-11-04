import { Box, } from "@mui/system"
import ChatFooter from './ChatFooter'
import ChatType from './ChatType'
import ChatHeader from "./ChatHeader";
import ChatPool from './ChatPool/Container'
import {
    sendMessage,
} from '../../actions/socket';
import { useDispatch } from "react-redux";

const Index=()=>{
    const dispatch = useDispatch()
    return(
        <Box sx={{position:'relative',width:'100%'}}>
           <ChatHeader/>
           <Box sx={{position:'relative'}}>
                <ChatPool/>
           </Box>
           <ChatType/>
        </Box>
    )
}

export default Index