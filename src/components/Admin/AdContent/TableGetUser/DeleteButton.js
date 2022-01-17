import * as React from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';


export default function DeleteButton({deleteState, setDeleteState, _id}) {
  const handleDeleteClick= function(userId) {
    // setCount (prevCount => prevCount + 1)
    const deleteUserId = async () => {
      const users = await axios.delete(`https://chat-app-server-hero.herokuapp.com/api/v1/users/${userId}`);
      setDeleteState(!deleteState)
      console.log(deleteState)
      console.log("Just delete userId: ",userId);
    };
    deleteUserId();

  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<DeleteIcon />} sx={{border: '0px'}} className='btnInList' onClick={() => handleDeleteClick(_id)}>
        
      </Button>
    </Stack>
  );
}