import { useState } from 'react'
import {AddNewAddress} from '../index.checkout'

function CheckoutBox() {
  const [addrStatus, setAddrStatus] = useState<string>("hidden")

  const handleFormVisibility = () => {
    if(addrStatus === 'visible'){
      setAddrStatus("hidden")
    }else if(addrStatus === 'hidden'){
      setAddrStatus('visible')
    }
  }

  return (
    <>
    <div className='p-6 rounded-md shadow w-2/5'>
      <div>
        <div>
          <span className="text-2xl text-text">1. Select a delivery address</span>
        </div>
        <div className="border ml-5 my-8 rounded">
          <div className="px-2 py-1">
            <div className="mb-1">
              <span>Your addresses</span>
            </div>
            <div className="border border-bg"></div>
            <div className="bg-bg px-4 py-2 my-2 rounded-md">
              <span className="text-sm">Laxman Krishnamurti, Dharamsheela Niwas, Ashok nagar road, Kankarbagh, Patna, Bihar, 800020</span>
            </div>
            <div className="ml-2 mb-4">
              <span> + </span>
              <button
                 onClick={handleFormVisibility}
                 className="hover:underline text-sm text-cta"
              >Add a new address</button>
            </div>
          </div>
          <div className="border-t bg-bg py-4">
                <button className="px-8 py-2 bg-cta ml-2 rounded-md hover:bg-ctah text-sm font-semibold">Use this address</button>
            </div>
        </div>
        <div className="mb-8">
          <span className="text-2xl text-text">2. Select a payment method</span>
        </div>
        <div className="ml-8 flex gap-16 items-center">
          <div>
            <select name="paymentmethod" className="px-8 py-3 bg-bg rounded-md outline-none">
              <option value="cod">Cash on delivery</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div>
            <button className="px-20 py-2 bg-cta rounded-md font-semibold text-text shadow shadow-primary hover:bg-ctah">Pay</button>
          </div>
        </div>
      </div>
      <div>  
    </div>
    </div>
    {/* fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 */}
    {addrStatus === 'visible' && (
        <div className="absolute w-full">
          <div className="relative top-16 w-full h-fit bg-text bg-opacity-50 flex justify-center items-center">
            <AddNewAddress handleClose={handleFormVisibility} />
          </div>
        </div>
      )}
    </>
  )
}

export default CheckoutBox