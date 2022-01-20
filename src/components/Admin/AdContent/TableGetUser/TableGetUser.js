import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import BlockButton from "./BlockButton";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CloseIcon from '@mui/icons-material/Close';
import UnBlockButton from "./unBlockButton";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './TableGetUser.css'

export default function GetUser({deleteState, setDeleteState, createState, setCreateState}) {
  const [usersList, setUsersList] = useState([]);
  const [backDrop, setBackDrop] = useState(true);
  const handleCloseBackDrop = () => {
    setBackDrop(false);
  };
  // const handleToggleBackDrop = () => {
  //   setBackDrop(!backDrop);
  // };

  useEffect(() => { 
    const getUser = async () => {
      const users = await axios.get(
        "https://chat-app-server-hero.herokuapp.com/api/v1/users"
      );
      console.log(users);
      const allUsers = users.data.users;
      setUsersList(allUsers);
      setBackDrop(false)
    };
    getUser();
  }, [deleteState, createState]);
  console.log("---getUser")



  return (
    <>
    <div>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDrop}
        onClick={handleCloseBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>

    <table className="table tableUsers">
      <thead>              
        <tr style={{position: 'sticky', top: '0px'}}>
          <th style={{width: '20px'}}>STT</th>
          {/* <th>Avatar</th> */}
          <th style={{width: '250px'}}>Tên người dùng</th>
          <th >Quyền</th>
          <th style={{width: '250px'}}>ID</th>
          <th style={{width: '150px'}}>Số điện thoại</th>
          <th style={{width: '150px'}}>Xác minh</th>
          {/* <th style={{width: '150px'}}>isOnline</th> */}
          <th style={{width: '150px'}}>Chặn</th>
          <th >Xoá</th>
          <th >Sửa</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((item, index) => {
          return (
            <tr key ={index}>
              <td>{index+1}</td>
              {/* <td>
                <div className="adminAvatarList"
                style={{backgroundImage: `url("${item.avatar}")` }}>
                </div>
              </td> */}
              <td>{item.username}</td>
              <td>{(item.role)=="admin"?<AdminPanelSettingsIcon/>: <PersonOutlineIcon/>}</td>
              <td>{item._id}</td>
              <td>{item.phone}</td>
              <td>{item.verify? <VerifiedUserIcon/>: <CloseIcon/>}</td>
              {/* <td>{item.isOnline? 'Yes': 'No'}</td> */}
              <td>{item.isBlock? <UnBlockButton/>: <BlockButton/>}</td>
              {/* <td>
                <div>
                <BlockButton/>
                </div>
              </td> */}
              <td><DeleteButton deleteState={deleteState} setDeleteState={setDeleteState} _id={item._id} /></td>
              <td><EditButton/></td>
            </tr>
          )}
        )}


        
      </tbody>
    </table>

    </>
  );
}
