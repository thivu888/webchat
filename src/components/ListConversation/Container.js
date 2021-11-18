import { Box } from '@mui/material';
import ConversationItem from './ConversationItem'
import useStyle from './style'
const Index=()=>{

    const classes = useStyle()

    return(
            <Box className={classes.container}>
                <ConversationItem/>
                <ConversationItem/>
                
            </Box>           
    )
}

export default Index