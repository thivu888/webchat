import { Box } from "@mui/system"
import ListConversation from '../ListConversation/Container'

import { styled } from "@mui/styles";
import { useSelector } from 'react-redux'
import Header from "./Header";
const Container = styled('div')((props) =>({
    position:'fixed',
        left:64,
        width:`${ props.isDesktop ? '336px' : 'calc(100vw - 64px)'}`,
        top:0,
        bottom:0,
        background:'#fff',
        borderRight:'1px solid #dbdbdb',
        cursor:'pointer',
        display:`${props.subWidth && props.focus ? 'none' : 'block'}`,
        '&::-webkit-scrollbar':{
            width: 5,
        },
}))



const Index=(props)=>{

    const {matches} = props

    const {focusContentRight,isDesktop} = useSelector(state => state.main)

    return(
        <Container isDesktop={isDesktop} focus={focusContentRight} >
                <Header/>
                <hr/>
                <Box>
                    <ListConversation/>
                </Box>
        </Container>
    )
}

export default Index