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

import InputShowInfor from "./InputShowInfor/InputShowInfor";

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

export default function ModalEdit({ modalUpdateState, setModalUpdateState, oneUser, editState, setEditState}) {
  const [open, setOpen] = React.useState(false);
  const [nameNewUser, setNameNewUser] = React.useState(oneUser.username);
  const [inforNewUser, setInforNewUser] = React.useState({});
  const [role, setRole] = React.useState(oneUser.role)
  const [verified, setVerified] = React.useState(oneUser.verify)
  // console.log("oneUser modalEdit: ", oneUser)

  useEffect(() => {
    setInforNewUser({
      "username": nameNewUser,
      "role": role,
      "verify": verified
    });

  },[nameNewUser, role, verified])

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setNameNewUser("")
    setInforNewUser({});
    setRole("user")
    setVerified(true)
    setModalUpdateState(false);
  };
  const handleCloseAfterUpdate = () => {
    // if(!nameNewUser && !phoneNewUser && !passwordNewUser && !confirmPassword) {
    //   alert("Không được để trống các trường!")
    // }else if(passwordNewUser !==confirmPassword){
    //   alert("Mật khẩu không thống nhất! Xin hãy nhập lại!")
    // }else {
      // console.log(inforNewUser)
      // const creatUser = async function(inforNewUser){
      //     console.log("đã tạo mới user")
      // }
      // const createUser = async () => {
        // const creatNewUser = await axios.post(
        //   "https://chat-app-server-hero.herokuapp.com/api/v1/users", inforNewUser
        // );
        // console.log("Edited user")
        // setInforNewUser({});
        // setCreateState(!createState)
        // console.log()
        // setModalUpdateState(false);

      // };
      // createUser();
    // }
    setModalUpdateState(false);
    console.log("DDax caajpp nhaajt")
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Thêm người dùng
      </Button> */}
      <BootstrapDialog 
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalUpdateState}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Sửa thông tin 
        </BootstrapDialogTitle>
        <DialogContent dividers>
              <InputShowInfor modalUpdateState={modalUpdateState}
                nameNewUser={nameNewUser} setNameNewUser={setNameNewUser}
                role={role} setRole={setRole}
                verified={verified} setVerified={setVerified}
                oneUser={oneUser}
              />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseAfterUpdate}>
            CẬP NHẬT
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
