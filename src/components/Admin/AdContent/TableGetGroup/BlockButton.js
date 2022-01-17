import * as React from 'react';
import Button from '@mui/material/Button';
import BlockIcon from '@mui/icons-material/Block';
import Stack from '@mui/material/Stack';

export default function BlockButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined"  startIcon={<BlockIcon /> } sx={{border: '0px'}} className='btnInList'>
       
      </Button>
    </Stack>
  );
}