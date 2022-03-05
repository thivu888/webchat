import { Box } from "@mui/system"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './admin.css'
import AdContent from './AdContent/AdContent.js'
import AdHeading from './AdHeading/AdHeading.js'
import AdMenu from './AdMenu/AdMenu.js'
import { updateIsDesktop } from "../../actions/Main";
import storage from "../../utils/storage"
import {handleUserClick} from "./AdMenu/AdMenu"

const token = JSON.parse(localStorage.getItem("_token"));
// console.log(token)

const Admin=()=>{
    const [menuSelected, setMenuSelected] = useState(1)
    const dispatch = useDispatch()
    const user = storage.getUserInfo()
    const verify = storage.getVerify()
    const matches = useMediaQuery('(min-width:800px)');
    dispatch( updateIsDesktop(matches))
    if(! user.verify && !verify){
        window.location.href='/verify'
        return 
    }
    if(user.role !== 'admin'){
        window.location.href='/'
        return 
    }
    return(
        <>
            <div >
                <AdHeading/>
            </div>
            <div style={{display: 'flex', width: '100vw', height:'calc(100vh - 80px)'}}>
                <AdMenu menuSelected={menuSelected} setMenuSelected={setMenuSelected}
                    
                />
                <AdContent menuSelected={menuSelected}
                />
            </div>
        </>
    )
}
export {token}
export default Admin