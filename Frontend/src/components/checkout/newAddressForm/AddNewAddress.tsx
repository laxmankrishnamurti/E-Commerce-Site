import crossPng from '../../../assets/cross.png'

function AddNewAddress({ handleClose }: { handleClose: () => void }) {
  return (
    <div className='w-1/2 bg-white'>
        <div className='flex justify-between py-4 px-10 items-center bg-bg'>
            <span className='text-text text-lg font-semibold'>Enter a new delivery address</span>
            <div className='w-8 cursor-pointer' onClick={handleClose}>
                <img src={crossPng} className='w-full hover:brightness-125'/>
            </div>
        </div>
        <span className='my-4 px-10 inline-block text-text text-2xl'>Add a new address</span>
        <form className='px-10 py-4 flex gap-4 flex-col'>
            <div className='flex flex-col gap-2'>
              <label className='text-text text-sm font-semibold' htmlFor='fullname'>Full name (First and last name)</label>
              <input
                type='text'
                name='fullname'
                id='fullname'
                className='shadow shadow-primary px-2 py-2 rounded-md outline-none'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-text text-sm font-semibold' htmlFor='street'>Street number</label>
              <input
                type='text'
                name='street'
                id='street'
                placeholder='Apartment, Road no, House no, Hour name, P.O'
                className='shadow shadow-primary px-2 py-2 rounded-md outline-none placeholder:text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-text text-sm font-semibold' htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                id='city'
                className='shadow shadow-primary px-2 py-2 rounded-md outline-none placeholder:text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-text text-sm font-semibold' htmlFor='state'>State</label>
              <input
                type='text'
                name='state'
                id='state'
                className='shadow shadow-primary px-2 py-2 rounded-md outline-none placeholder:text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-text text-sm font-semibold' htmlFor='pincode'>PIN Code</label>
              <input
                type='text'
                name='pincode'
                id='pincode'
                className='shadow shadow-primary px-2 py-2 rounded-md outline-none placeholder:text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-text text-sm font-semibold' htmlFor='phonenumber'>Phone number</label>
              <input
                type='text'
                name='phonenumber'
                id='phonenumber'
                className='shadow shadow-primary px-2 py-2 rounded-md outline-none placeholder:text-sm'
              />
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='defaultaddr'
                id='defaultaddr'
                className='checked:bg-cta default:ring-2 hover:cursor-pointer'
              />
              <label className='text-cta text-sm font-semibold hover:cursor-pointer' htmlFor='defaultaddr'>Use as my default address</label>
            </div>
            <div>
                <button type='submit' className='px-8 py-2 bg-cta mt-8 rounded-md shadow shadow-primary font-semibold hover:bg-ctah'>Use this address</button>
            </div>
        </form>
    </div>
  )
}

export default AddNewAddress