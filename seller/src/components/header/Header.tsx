import { useState } from 'react'
import { Link } from 'react-router-dom'
import cartPng from '../../assets/cart-orange.png'
import profileIcon from '../../assets/user.png'


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
    <div className="w-full bg-primary text-bg h-20 flex items-center justify-between px-28">
      <div>
        <Link to={`/admin`}><span className='text-2xl font-semibold'>Welcome to shopi seller central</span></Link>
      </div>
      <div className='flex justify-between items-center gap-8'>
        <div className='bg-bg p-2 rounded-md flex gap-4 justify-center items-center'>
            <div className='border-r border-primary border-dashed w-9 h-6'>
                <img src={cartPng} className='w-full h-full pr-2'/>
            </div>
            <div className='pr-2 text-primary'>0</div>
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
    </div>
  )
}

export default Header