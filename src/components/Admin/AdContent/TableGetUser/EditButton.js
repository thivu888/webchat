import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';

export default function EditButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<EditIcon />} sx={{border: '0px'}} className='btnInList'>
        
      </Button>
    </Stack>
  );
}