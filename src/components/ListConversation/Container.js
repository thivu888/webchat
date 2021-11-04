import { Box } from '@mui/material';
import ConversationItem from './ConversationItem'
const Index=()=>{



    return(
            <Box sx={{height:544,overflowY:'scroll',overflowX:'hidden'}}>
                <ConversationItem/>
                <ConversationItem/>
                
            </Box>           
    )
}

export default Index