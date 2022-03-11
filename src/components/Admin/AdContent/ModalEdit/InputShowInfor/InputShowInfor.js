import * as React from 'react';
import {memo} from 'react'
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from '@mui/material/TextField';

import "./InputShowInfor.css"

function InputShowInfor({modalUpdateState, nameNewUser, setNameNewUser,
       phoneNewUser, setPhoneNewUser, 
       passwordNewUser, setPasswordNewUser,
       role, setRole, verified, setVerified,
       oneUser
      }) {
  {console.log ("inputShow",modalUpdateState)}
  setRole(oneUser.role);
  
  const handleChangeAdmin = (event) => {
      console.log("Là quản trị viên: ",event.target.checked);
      // setChecked(event.target.checked);
      if(event.target.checked) {
            setRole("admin")
      }
  };
  const handleChangeVerified = (event) => {
      console.log('Đã xác minh: ',event.target.checked);
      // setChecked(event.target.checked);
      if(!event.target.checked) {
            setVerified(false)
      }
  };

  return (
      <>
            <div className='InputFields'>
                  {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                  <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                  <TextField id="standard-basic-username" 
                        label="User Name" variant="standard" required={true}
                        onChange={(e) => setNameNewUser(e.target.value)}
                        defaultValue={oneUser.username}
                        />
                  {/* <TextField id="standard-basic-email" label="Email" variant="standard" /> */}
                  <TextField id="standard-basic-phone" 
                        label="Phone" variant="standard" required={true} 
                        // onChange={(e) => setPhoneNewUser(e.target.value)}
                        defaultValue={oneUser.phone}
                        disabled 
                        />
                  <TextField id="standard-basic-password" 
                        label="Password" variant="standard" 
                        type="password" required={true} 
                        // onChange={(e) => setPasswordNewUser(e.target.value)}
                        defaultValue={oneUser.password}
                        disabled
                        />
                  {/* <TextField id="standard-basic-confirmpassword" 
                        label="Confirm Password" variant="standard" 
                        type="password" required={true} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        /> */}
            </div>
            <FormGroup>
                  <FormControlLabel
                  control={<Switch />}
                  label="Là quản trị viên"
                  onChange={handleChangeAdmin}
                  checked={role=='admin'?true:false}
                  />
                  <FormControlLabel
                  control={<Switch  />}
                  label="Đã xác minh"
                  onChange={handleChangeVerified}
                  checked={oneUser.verify?true:false}
                  disabled
                  />
            </FormGroup> 
      </>
  );
}


export default memo(InputShowInfor)