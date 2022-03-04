import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import BlockIcon from '@mui/icons-material/Block';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Stack from '@mui/material/Stack';
import {token} from '../../Container'

export default function BlockButton({isBlock, _id, blockState, setBlockState }) {
  const handleDeleteClick= function(userId) {
    console.log('Da block ID: ', userId)
    console.log(typeof(token));
    const blockUserId = async () => {
      const resultBlock = await axios.put(`https://chat-app-server-hero.herokuapp.com/api/v1/users/${userId}`, {"isBlock": !isBlock},
      { headers: {"Authorization" : `Bearer ${token}`} } );
      console.log("result block: ", resultBlock)
      setBlockState(!blockState)
    };
    blockUserId()
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" sx={{border: '0px'}} className='btnInList'
        startIcon={isBlock?<LockIcon />: <LockOpenIcon /> }
        onClick={() => handleDeleteClick(_id)}
        >
       
      </Button>
    </Stack>
  );
}