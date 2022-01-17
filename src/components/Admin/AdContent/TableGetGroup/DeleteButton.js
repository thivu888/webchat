import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

export default function DeleteButton({deleteState, setDeleteState, _id}) {
  const handleDeleteClick = (groupId) => {
    // console.log(groupId);
    setDeleteState(!deleteState)
    console.log(deleteState)
  }
  
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<DeleteIcon />} sx={{border: '0px'}} className='btnInList' onClick={() => handleDeleteClick(_id)}>
        
      </Button>
    </Stack>
  );
}