import { Link } from 'react-router-dom'
import seachSvg from  '../../assets/search.svg'
import downarrowSvg from  '../../assets/downarrow.svg'
import React, { useRef, useState, useEffect } from 'react'

function Header() {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [selectWidth, setSelectWidth] = useState<string>("");
    const textRef = useRef<HTMLSpanElement | null>(null);

    const options: string[] = ["Books", "Gym", "Bikes", "Home appliences", "Laptops"]

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value)
    }

    useEffect(() => {
        if (textRef.current) {
          setSelectWidth(`${textRef.current.offsetWidth + 50}px`); // Adding some padding (50px)
        }
      }, [selectedOption]);

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
                        className='outline-none appearance-none rounded-tl-md rounded-bl-md px-2  bg-bg'
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
        <div className='text-bg flex gap-4'>
            <Link to={`/signin`} className='hover:text-bgh transition'>Sign In</Link>
            <Link to={`/signup`} className='hover:text-bgh transition'>Sign Up</Link>
        </div>
    </div>
  )
}

export default Header