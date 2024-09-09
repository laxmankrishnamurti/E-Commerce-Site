import './Filter.css'

function Filter() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <div>
          <span className='font-semibold text-text'>Price</span>
        </div>
        <div className='flex justify-between'>
          <button className="s-price font-medium">Hight To Low</button>
          <button className="s-price font-medium">Low to High</button>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div>
          <span className='font-semibold text-text'>Ratings</span>
        </div>
        <div>
          <button className='star-btn'>⭐⭐⭐</button>
          <button className='star-btn'>⭐⭐⭐⭐</button>
          <button className='star-btn'>⭐⭐⭐⭐⭐</button>
        </div>
      </div>
    </div>
  )
}

export default Filter