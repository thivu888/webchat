import React from 'react'
import { Box } from '@mui/system'
import { Container, Grid } from '@mui/material'
import {useSelector} from 'react-redux'
import  AddFriendItem  from './AddFriendItem'
import Header from './Header'
import useStyle from './style'
import { GroupItem } from './GroupItem'
import BoxChat from '../BoxChat'
import { ListGroupUser } from './ListGroupUser'
import { ListFriendAdd } from './ListFriendAdd'
const ContainerWraper = () => {

    const classes = useStyle()




    const {targetContentRight,} = useSelector(state => state.main)
    return (
        <Box sx={{position:'relative',width:'100%'}}>
            {targetContentRight === "message" ? <BoxChat/> : (<>
                <Header/>
                <Box sx={{position:'relative'}}>
                    <Box className={classes.container}>
                        <Container maxWidth="desktop" >
                            {targetContentRight === "group" && <ListGroupUser/>}
                            {targetContentRight === "addfriend" && <ListFriendAdd/>}
                        </Container>
                    </Box>
                </Box>
                </>
            )}
            
        </Box>
    )
}
export default ContainerWraper
