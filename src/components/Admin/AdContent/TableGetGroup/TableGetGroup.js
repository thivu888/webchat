import axios from "axios";
import { useEffect, useState } from "react";
import './TableGetGroup.css'
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import BlockButton from "./BlockButton";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CloseIcon from '@mui/icons-material/Close';
import UnBlockButton from "./unBlockButton";


export default function GetGroup({deleteState, setDeleteState}) {
  const [groupsList, setGroupsList] = useState([]);
  
  useEffect(() => { 
    const getGroup = async () => {
      const groups = await axios.get(
        "https://chat-app-server-hero.herokuapp.com/api/v1/rooms/,/,"
        );
        console.log(groups.data.data);
        const allGroups = groups.data.data;
        setGroupsList(allGroups);
      };
      getGroup();
    }, []);
    
    function handleAfterDelete(id) {
      // axios.delete(`https://chat-app-server-hero.herokuapp.com/api/v1/rooms/${id}`)
      //  .then(() => {
      //   getGroup();
      // })
      console.log(id)
    }

    // function getGroup(){
  //   const getGroup = async () => {
  //     const groups = await axios.get(
  //       "https://chat-app-server-hero.herokuapp.com/api/v1/rooms/,/,"
  //     );
  //     console.log(groups.data.data);
  //     const allGroups = groups.data.data;
  //     setGroupsList(allGroups);
  //   };
  // }

  // function getCreatorInfor(id) {
  //     const CreatorInfor =  axios.get(
  //       `https://chat-app-server-hero.herokuapp.com/api/v1/users/${id}`
  //     );
  //     return(CreatorInfor.data.data.username)
  // }
  console.log("---getGroup")

  return (
    
    <table className="table tableUsers">
      <thead>              
        <tr style={{position: 'sticky', top: '0px'}}>
          <th style={{width: '20px'}}>STT</th>
          {/* <th>Avatar</th> */}
          <th style={{width: '250px'}}>ID nhóm</th>
          <th style={{width: '250px'}}>Tạo bởi</th>
          {/* <th style={{width: '150px'}}>Số điện thoại</th> */}
          {/* <th style={{width: '150px'}}>Xác minh</th> */}
          {/* <th style={{width: '150px'}}>isOnline</th> */}
          {/* <th style={{width: '150px'}}>Chặn</th> */}
          <th >Xoá</th>
          {/* <th >Sửa</th> */}
        </tr>
      </thead>
      <tbody>
        {groupsList.map((item, index) => {
          return (
            <tr key ={index}>
              <td>{index+1}</td>
              {/* <td>
                <div className="adminAvatarList"
                style={{backgroundImage: `url("${item.avatar}")` }}>
                </div>
              </td> */}
              <td>{item._id}</td>
              {/* <td>{getCreatorInfor(item.createBy)}</td> */}
              <td>{item.createBy}</td>
              {/* <td>{item.phone}</td> */}
              {/* <td>{item.verify? <VerifiedUserIcon/>: <CloseIcon/>}</td> */}
              {/* <td>{item.isOnline? 'Yes': 'No'}</td> */}
              {/* <td>{item.isBlock? <UnBlockButton/>: <BlockButton/>}</td> */}
              {/* <td>
                <div>
                getCreatorInfor(61d075e529db120bcb3774d4)
                <BlockButton/>
                </div>
              </td> */}
              <td onClick={()=>handleAfterDelete(item._id)}><DeleteButton deleteState={deleteState} setDeleteState={setDeleteState} _id={item._id} /></td>
              {/* <td><EditButton/></td> */}
            </tr>
          )}
        )}
        
      </tbody>
    </table>
  );
}
