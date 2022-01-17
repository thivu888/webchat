import './AdHeading.css'
function AdHeading() {
  console.log("--Heading")
  return(
    <>
    <header className='adminHeading'>
      <div className='adminLogo'>VN CHAT</div>
      <div className='adminMemberOnline'>Số người truy cập: 16</div>
    </header>
    </>
  )
}

export default AdHeading