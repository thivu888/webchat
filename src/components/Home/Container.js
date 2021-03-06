import { Box } from "@mui/system"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from "react-redux";
import { updateIsDesktop } from "../../actions/Main";
import LeftBar from '../LeftBar'
import ContentLeft from '../ContentLeft'
import ContentRight from '../ContentRight'
import ProfileUser from '../../components/profile'
import storage from "../../utils/storage"
const Home=()=>{
    const dispatch = useDispatch()
    const user = storage.getUserInfo()
    const verify = storage.getVerify()
    const matches = useMediaQuery('(min-width:800px)');
    dispatch( updateIsDesktop(matches))
    if(! user.verify && !verify){
        window.location.href='/verify'
        return 
    }
    return(
        <Box sx={{display:'flex'}}>
            <LeftBar />
            <ContentLeft />
            <ContentRight />
            <ProfileUser/>
        </Box>
    )
}

export default Home