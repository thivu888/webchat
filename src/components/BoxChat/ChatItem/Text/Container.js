import { Box, styled } from '@mui/system'
import useStyle from './style'

const Index=(props)=>{
    const classes=useStyle()
    return(<>
        <Box className={classes.content}>
            <Box className={props.isOwn?classes.content_me:classes.content_you}>
                {props.content}
            </Box>
        </Box>
    </>
    )
}

export default Index