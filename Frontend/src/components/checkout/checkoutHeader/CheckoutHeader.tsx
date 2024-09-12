import padLock from '../../../assets/padlock.png'

function CheckoutHeader() {
  return (
    <div className='bg-primary flex justify-evenly items-center h-16 text-bg'>
        <div>
          <span className='text-3xl font-semibold'>shopi</span>
        </div>
        <div>
          <span className='text-3xl font-semibold'>Checkout</span>
        </div>
        <div className='w-8'>
          <img src={padLock}/>
        </div>
    </div>
  )
}

export default CheckoutHeader