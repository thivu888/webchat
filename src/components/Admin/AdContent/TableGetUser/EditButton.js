import * as React from 'react';
import axios from "axios";
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import ModalEdit from '../ModalEdit/ModalEdit';

export default function EditButton({_id , editState, setEditState}) {
  const [userInforById, setUserInforById] = useState([])
  const [modalUpdateState, setModalUpdateState] = useState(false)

  const getUserInforById = async () => {
    const userInfor = await axios.get(
      `https://chat-app-server-hero.herokuapp.com/api/v1/users/${_id}`
    );
    console.log(userInfor);
    const oneUser = userInfor.data.data;
    setUserInforById(oneUser);
    console.log(oneUser);
    setModalUpdateState(!modalUpdateState)
    // setBackDrop(false)
  };
  // useEffect(() => { 
  //   getUserInforById();
  // }, []);

  const handleEdit = function(userID){
    console.log('hello edit ID: ',_id)
    getUserInforById();
    
  }
  return (
    <>
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<RemoveRedEyeTwoToneIcon />} sx={{border: '0px'}} className='btnInList'
              onClick={() => handleEdit(_id)}>
        
      </Button>
    </Stack>
    <ModalEdit modalUpdateState={modalUpdateState} setModalUpdateState={setModalUpdateState} oneUser={userInforById}
                editState={editState} setEditState={setEditState} />
    </>
  );
}