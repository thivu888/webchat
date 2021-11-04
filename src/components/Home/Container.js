import { Box } from "@mui/system"
import LeftBar from '../LeftBar'
import ContentLeft from '../ContentLeft'
import ContentRight from '../ContentRight'
import storage from "../../utils/storage"
const Home=()=>{
    const user = storage.getUserInfo()
    const verify = storage.getVerify()
    if(! user.verify && !verify){
        window.location.href='/verify'
        return 
    }
    return(
        <Box sx={{display:'flex'}}>
            <LeftBar/>
            <ContentLeft/>
            <ContentRight/>
        </Box>
    )
}

export default Home