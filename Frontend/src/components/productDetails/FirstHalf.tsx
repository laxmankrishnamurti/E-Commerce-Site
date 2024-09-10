import {ImageContainer, ProductShortDescription, ActionButton} from './index.productDetails' 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function FirstHalf() {

  const product = useSelector((state: RootState) => state.singleProduct)
  console.log("product value from first half : ", product)

  return (
    <div>
      <div className='flex justify-between'>
        <div>
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