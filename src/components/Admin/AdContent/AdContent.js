import { useState } from 'react'
import './AdContent.css'
import TableGetUser from './TableGetUser/TableGetUser.js'
import TableGetGroup from './TableGetGroup/TableGetGroup'
import ModalAddUser from './ModalAddUser/ModalAddUser'

function AdContent({menuSelected}) {
  const [backDrop, setBackDrop] = useState(true);
  const [deleteState, setDeleteState] = useState(false)
  const [createState, setCreateState] = useState(false)
  const [editState, setEditState] = useState(false)
  const [blockState, setBlockState] = useState(false)
  const [reFreshState, setReFreshState] = useState(false)
  const [searchState, setSearchState] = useState('')


  // console.log("Backdrop content",backDrop)
  const handleRefreshData= function() {
    console.log('Refresh Data ')
    setBackDrop(!backDrop)
    setReFreshState(!reFreshState)
  }

  return(
    <>
    {menuSelected ===1 ? 
      <div className= 'adminContent'>
        <div className='adminTopContent'>
          <div className='adminNameTable'>Danh sách người dùng</div>
          <div className='adminAddUser Modal'>
            <ModalAddUser createState={createState} setCreateState={setCreateState} />
          </div>
        </div>
        <div className='adminSecondContent'>
          <div className='adminSearch'>
            <form>
              <label>
                <input type="text" name="name" placeholder='Tên người dùng'
                  onChange={(e)=>{setSearchState(e.target.value)}}
                />
              </label>
            </form>
          </div>
          <div className='adminRefresh' onClick={() => handleRefreshData()}></div>
        </div>
        <div className='adminTableList'>
              <TableGetUser 
                  deleteState={deleteState} setDeleteState={setDeleteState} 
                  createState={createState} setCreateState={setCreateState} 
                  editState={editState} setEditState={setEditState}
                  blockState={blockState} setBlockState={setBlockState}
                  reFreshState={reFreshState}
                  backDrop={backDrop} setBackDrop={setBackDrop}
                  searchState={searchState} setSearchState={setSearchState}
                  />
        </div>
        <div className='adminFooter'>
            {/* <div>Hiển thị 1-10 người dùng</div>
            <div className='adminPage'>
                <div className='adminStage first'>FIRST</div>
                <div className='adminStage previous'>Previous</div>
                <div className='adminStage one'>1</div>
                <div className='adminStage two'>2</div>
                <div className='adminStage three'>3</div>
                <div className='adminStage next'>Next</div>
                <div className='adminStage end'>END</div>
            </div>
            <div>10 người dùng/trang</div> */}
        </div>
      </div> : 
//xxxxxxxxxxxxxxxxxxx
      // <div className= 'adminContent'>
      //   <div className='adminTopContent'>
      //     <div className='adminNameTable'>Danh sách nhóm</div>
      //     <div className='adminAddUser Modal'>THÊM NHÓM</div>
      //   </div>
      //   <div className='adminSecondContent'>
      //     <div className='adminSearch'>
      //       <form>
      //         <label>
      //           <input type="text" name="name" placeholder='Tên nhóm'/>
      //         </label>
      //       </form>
      //     </div>
      //     <div className='adminRefresh'></div>
      //   </div>
      //   <div className='adminTableList'>
      //         <TableGetGroup deleteState={deleteState} setDeleteState={setDeleteState}/>
      //   </div>
      //   <div className='adminFooter'>
            {/* <div>Hiển thị 1-10 nhóm</div>
            <div className='adminPage'>
                <div className='adminStage first'>FIRST</div>
                <div className='adminStage previous'>Previous</div>
                <div className='adminStage one'>1</div>
                <div className='adminStage two'>2</div>
                <div className='adminStage three'>3</div>
                <div className='adminStage next'>Next</div>
                <div className='adminStage end'>END</div>
            </div>
            <div>10 nhóm/trang</div> */}
      //   </div>
      // </div>
    }
    </>

  )
}

export default AdContent