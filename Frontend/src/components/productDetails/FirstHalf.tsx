import {ImageContainer, ProductShortDescription, ActionButton} from './index.productDetails' 

function FirstHalf() {

  return (
    <div>
      <div className='flex justify-between'>
        <div className='w-2/5 h-fit'>
          <ImageContainer/>
        </div>
        <div className='w-1/2 p-4 h-max'>
          <ProductShortDescription/>
        </div>
        </div>
      <div className='w-full flex justify-end'>
        <ActionButton/>
      </div>
    </div>
  )
}

export default FirstHalf