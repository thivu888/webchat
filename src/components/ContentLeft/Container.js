import { Box } from "@mui/system"
import ListConversation from '../ListConversation'
import ListContacts from "../ListContacts";
import { styled } from "@mui/styles";
import { useSelector } from 'react-redux'
import Header from "./Header";
const Container = styled('div')((props) => {return ({
    position:'fixed',
        left:64,
        width:336,
        top:0,
        bottom:0,
        background:'#fff',
        borderRight:'1px solid #dbdbdb',
        cursor:'pointer',
        display:'block',
        [props.theme.breakpoints.down('tablet')]: {
            width:`calc(100vw - 64px)`,
            display :props =>{return `${props.focus ? 'none' : 'block'}`},
        },
        '&::-webkit-scrollbar':{
            width: '5px',
        },

})})
 


const Index=(props)=>{

    const {focusContentRight,targetContent} = useSelector(state => state.main)
    return(
        <Container focus={focusContentRight} >
                <Header/>
                <Box>
                    {targetContent === "message" && <ListConversation/>}
                    {targetContent === "contacts" && <ListContacts/>}
                </Box>
        </Container>
    )
}

export default Index