import { Link } from 'react-router-dom'
import profileIcon from '../../assets/user.png'
import { useState } from 'react'

function Header() {
  const [logoutVisibility, setLogoutVisibility] = useState<string>("hidden")

  const handleLogoutVisibility = () => {
    if(logoutVisibility === 'hidden'){
      setLogoutVisibility("visible")
    }else if(logoutVisibility === 'visible'){
      setLogoutVisibility("hidden")
    }
  }

  return (
    <div className="w-full bg-primary text-bg h-14 flex items-center justify-between px-28">
      <div>
        <Link to={`/admin`}><span className='text-2xl font-semibold'>Welcome to shopi seller central</span></Link>
      </div>
      <div className='w-8 flex justify-center items-center relative'>
        <button onClick={handleLogoutVisibility}>
          <img src={profileIcon}/>
        </button>
        <div className={`${logoutVisibility} absolute shadow shadow-primary top-11 px-8 py-2 rounded-md`}>
          <button className='text-text'>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Header