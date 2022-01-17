import * as React from 'react';
import {memo} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import "./InputUserInfor.css"

function InputUserInfor({open, nameNewUser, setNameNewUser, phoneNewUser, setPhoneNewUser, passwordNewUser, setPasswordNewUser, confirmPassword, setConfirmPassword}) {
  {console.log (open)}

  return (
    <div className='InputFields'>
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" /> */}
      <TextField id="standard-basic-username" 
            label="User Name" variant="standard" required={true}
            onChange={(e) => setNameNewUser(e.target.value)}
            />
      {/* <TextField id="standard-basic-email" label="Email" variant="standard" /> */}
      <TextField id="standard-basic-phone" 
            label="Phone" variant="standard" required={true} 
            onChange={(e) => setPhoneNewUser(e.target.value)}
            />
      <TextField id="standard-basic-password" 
            label="Password" variant="standard" 
            type="password" required={true} 
            onChange={(e) => setPasswordNewUser(e.target.value)}
            />
      <TextField id="standard-basic-confirmpassword" 
            label="Confirm Password" variant="standard" 
            type="password" required={true} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
    </div>
  );
}


export default memo(InputUserInfor)