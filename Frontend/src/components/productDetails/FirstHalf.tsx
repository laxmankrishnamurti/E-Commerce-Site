import {ImageContainer, ProductShortDescription, ActionButton} from './index.productDetails' 

function FirstHalf() {

  return (
    <div>
      <div className='flex justify-between'>
        <div className='w-2/5 h-fit'>
          <ImageContainer/>
        </div>
        <div>
          <ProductShortDescription/>
        </div>
        </div>
      <div>
        <ActionButton/>
      </div>
    </div>
  )
}

export default FirstHalf