import { Link, useLocation } from 'react-router-dom'
import seachSvg from  '../../assets/search.svg'
import downarrowSvg from  '../../assets/downarrow.svg'
import cartPng from  '../../assets/cart.png'
import userPng from  '../../assets/user.png'
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

function Header() {
    const [location, setLocation] = useState<string | null>(null)
    const [totalCartQuantity, setTotalCartQuantity] = useState<number | null>(null)
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [selectWidth, setSelectWidth] = useState<string>("");
    const textRef = useRef<HTMLSpanElement | null>(null);

    const getLocation = useLocation()

    useEffect(() => {
        setLocation(getLocation.pathname)
    }, [getLocation])

    const options: string[] = ["Books", "Shoes", "Bikes", "Home appliences", "Laptops", "Clothes"]

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value)
    }

    useEffect(() => {
        if (textRef.current) {
          setSelectWidth(`${textRef.current.offsetWidth + 40}px`); // Adding some padding (50px)
        }
      }, [selectedOption]);

      const CartProduct = useSelector((state:RootState) => state.cartProduct)
      useEffect(() => {
        let totalQuantity = 0;
        CartProduct.forEach((cartItem) => {
            totalQuantity += cartItem.quantity
        })
        setTotalCartQuantity(totalQuantity)
      }, [CartProduct])

  return (
    <div className='w-full min-h-20 bg-hbg flex items-center justify-evenly'>
        <div className="text-center">
            <h1 className="text-3xl font-bold text-bg">
                <Link to={`/`}>shopi</Link>
            </h1>
        </div>
        <div className='w-2/4 h-10'>
            <form className='w-full h-full flex items-center justify-center'>
                <div className=' h-full relative flex'>
                    <span
                        ref={textRef}
                        className="invisible absolute text-base font-medium"
                        aria-hidden="true"
                    >
                        {selectedOption}
                    </span>
                    <select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        name="selectedOption" 
                        style={{ width: selectWidth }}
                        className='text-sm text-text outline-none appearance-none rounded-tl-md rounded-bl-md px-2 bg-bg hover:cursor-pointer'
                    >
                        <option></option>
                        {
                            options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))
                        }
                    </select>
                    {
                        selectedOption ? null : <div className='w-full h-full absolute right-0 pointer-events-none flex items-center'>
                        <img src={downarrowSvg}  className='w-full h-full'/>
                    </div>
                    }
                </div>
                <div className='w-10/12 h-full'>
                    <input
                        type="text"
                        name="searchvalue"
                        placeholder="Search products..........."
                        className='w-full h-full outline-none px-2 text-sm'
                    />
                </div>
                <div className='w-1/12 h-full'>
                    <button type="submit" className='h-full bg-cta flex justify-center items-center p-4 rounded-tr-md rounded-br-md'>
                        <img src={seachSvg}/>
                    </button>
                </div>
            </form>
        </div>
        <div className='flex gap-4 items-center -mr-28'>
            {
                location === '/admin' ? (
                    <div className='w-10 mr-8'>
                        <button>
                            <img src={userPng} className='w-full'/>
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to={`/signin`} className='hover:text-bgh transition text-bg'>Sign In</Link>
                        <Link to={`/signup`} className='hover:text-bgh transition text-bg'>Sign Up</Link>
                    </>
                )
            }
            <Link to={`/cart`}>
                <div className='bg-bg p-2 rounded-md flex gap-4 justify-center items-center'>
                    <div className='border-r border-dashed w-9 h-6'>
                        <img src={cartPng} className='w-full h-full pr-2'/>
                    </div>
                    <div className='pr-2'>
                        {totalCartQuantity}
                    </div>
                </div>
            </Link>
        </div>
        
    </div>
  )
}

export default Header