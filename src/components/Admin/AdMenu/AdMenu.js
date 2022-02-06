import { useState } from 'react'
import authentication from '../../../services/authentication';

// import {useHistory} from "react-router-dom"

import AdContent from '../AdContent/AdContent';
import './AdMenu.css'


function AdMenu({menuSelected, setMenuSelected}) {
  // const history = useHistory();
  // console.log("--Menu")
  function handleHomeClick() {
    console.log("handle home click")
    window.location.href = "http://localhost:3000/";
  }
  // const directToHome =() => console.log("welcome Home!");

  function handleUserClick() {
      setMenuSelected(1);
    }
  function handleGroupClick() {
    setMenuSelected(2);
  }
  function handleLogoutClick() {
    console.log("handle logout click")
    authentication.logOut()
  }


  return(
    <>
    <div className= 'adminMenu'>
      
      <div>
          <div className='adminItem home'
            onClick={handleHomeClick}
          >
            <div className='adminItemIcon home'></div>
            <div className='adminItemContent'>TRANG CHỦ</div>
          </div>

          <div className={`adminItem user ${menuSelected === 1 ? 'active' : ''}` }
            onClick={handleUserClick}
            
          >
            <div className='adminItemIcon user'></div>
            <div className='adminItemContent'>NGƯỜI DÙNG</div>
          </div>

          {/* <div className={`adminItem group ${menuSelected === 2 ? 'active' : ''}` }
            onClick={handleGroupClick}
          >
            <div className='adminItemIcon group'></div>
            <div className='adminItemContent'>NHÓM</div>
          </div> */}
      </div>  

      <div className='adminItem logout'
        onClick={handleLogoutClick}
      >
        <div className='adminItemIcon logoutIcon'></div>
        <div className='adminItemContent'>ĐĂNG XUẤT</div>
      </div>
      
    </div>
    </>
  )
}

export default AdMenu