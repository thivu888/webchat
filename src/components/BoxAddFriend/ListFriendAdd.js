import React,{useState, useEffect} from 'react'
import { Grid, GridItem } from '@mui/material'
import AddFriendItem from './AddFriendItem'
import UserService from '../../services/user'
import { CircularProgress } from '@mui/material';
export const ListFriendAdd = () => {

    const [listUser,setListUser] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        handleCallAPI()
    }, [])

    const handleCallAPI =async () => {
        setLoading(true)
        UserService.getAllUsers().then(res => {
            setLoading(false)
            setListUser([...res.users])
        }).catch(e=>console.log(e))
    }

    const getItem = () =>{
        let list = []
        list = listUser.map((item)=><AddFriendItem key={item._id} user={item}/>)
        return list
    }

    return (
        <Grid container spacing={1} >
            {loading && <CircularProgress sx={{margin:'30% auto'}}/> }
            {getItem()}
        </Grid>
    )
}
