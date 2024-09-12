import {CheckoutHeader, CheckoutBox} from './index.checkout'

function Checkout() {
  return (
    <div>
      <div>
        <CheckoutHeader/>
      </div>
      <div className='w-full flex justify-center items-center h-screen'>
        <CheckoutBox/>
      </div>
    </div>
  )
}

export default Checkout