import * as React from "react";
import axios from "axios";
import {useEffect} from 'react'
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import InputUserInfor from "./InputUserInfor/InputUserInfor";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function ModalAddUser({createState, setCreateState}) {
  const [open, setOpen] = React.useState(false);
  const [ nameNewUser, setNameNewUser] = React.useState('');
  const [ phoneNewUser, setPhoneNewUser] = React.useState('');
  const [ passwordNewUser, setPasswordNewUser] = React.useState('');
  const [ confirmPassword, setConfirmPassword] = React.useState('');
  const [inforNewUser, setInforNewUser] = React.useState({});
  const [role, setRole] = React.useState('user')
  const [verified, setVerified] = React.useState(true)

  useEffect(() => {
    setInforNewUser({
      "phone": phoneNewUser,
      "password": passwordNewUser,
      "username": nameNewUser,
      "role": role,
      "verify": verified
    });

  },[nameNewUser, phoneNewUser, passwordNewUser, role, verified])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setNameNewUser("")
    setPhoneNewUser("")
    setPasswordNewUser("")
    setConfirmPassword("")
    setInforNewUser({});
    setRole("user")
    setVerified(true)
    setOpen(false);
  };
  const handleCloseAfterSubmit = () => {
    if(!nameNewUser && !phoneNewUser && !passwordNewUser && !confirmPassword) {
      alert("Không được để trống các trường!")
    }else if(passwordNewUser !==confirmPassword){
      alert("Mật khẩu không thống nhất! Xin hãy nhập lại!")
    }else {
      console.log(inforNewUser)
      // const creatUser = async function(inforNewUser){
      //     console.log("đã tạo mới user")
      // }
      const createUser = async () => {
        const creatNewUser = await axios.post(
          "https://chat-app-server-hero.herokuapp.com/api/v1/users", inforNewUser
        );
        console.log("đã tạo mới user")
        setInforNewUser({});
        setCreateState(!createState)
        console.log()
        setOpen(false);

      };
      createUser();
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm người dùng
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Thêm người dùng 
        </BootstrapDialogTitle>
        <DialogContent dividers>
              <InputUserInfor open={open}
                nameNewUser={nameNewUser} setNameNewUser={setNameNewUser}
                phoneNewUser={phoneNewUser} setPhoneNewUser={setPhoneNewUser}
                passwordNewUser={passwordNewUser} setPasswordNewUser={setPasswordNewUser}
                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                role={role} setRole={setRole}
                verified={verified} setVerified={setVerified}
              />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseAfterSubmit}>
            TẠO MỚI
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
