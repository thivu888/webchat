import Boxchat from '../BoxChat/Container'
import { useSelector } from 'react-redux'
import { styled } from '@mui/styles'

const Container = styled('div')((props) => ({
    position:'relative',
    background:'#fff',
    left:`${props.isDesktop? '401px' : '64px'}`,
    width:`calc(100vw - ${props.isDesktop? '401px' : '64px'})`, 
    display :`${ props.focus ? 'block' : 'none'}`
}))


const Index=(props)=>{
    
    const {focusContentRight,isDesktop} = useSelector(state => state.main)
    const {matches} = props
    return(
        <Container isDesktop={isDesktop} focus={focusContentRight} >
            <Boxchat />
        </Container>
    )
}

export default Index