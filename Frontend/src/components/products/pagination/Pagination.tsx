import arrow from '../../../assets/downarrow.svg';
import './Pagination.css'

function Pagination() {
  return (
    <div className='p-1 flex items-center shadow justify-center rounded-md'>
        <div>
            <button className='w-10 flex items-center justify-center'>
                <img src={arrow} className='w-full rotate-90'/>
            </button>
        </div>
        <div className='flex gap-1'>
            <button className='page-button'>1</button>
            <button className='page-button'>2</button>
            <button className='page-button'>3</button>
            <button className='page-button'>4</button>
            <button className='page-button'>5</button>
            <button className='page-button'>6</button>
            <button className='page-button'>7</button>
            <button className='page-button'>8</button>
        </div>
        <div>
            <button className='w-10 flex items-center justify-center'>
                <img src={arrow} className='w-full -rotate-90'/>
            </button>
        </div>
    </div>
  )
}

export default Pagination