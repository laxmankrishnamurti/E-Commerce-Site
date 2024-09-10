import { useParams } from "react-router-dom"
import {FirstHalf, SecondHalf} from './index.productDetails'

function ProductDetails() {

    const params = useParams() 
    console.log("Parrams value in product details page : ", params)

  return (
    <div className="px-28 py-8">
      <div>
        <FirstHalf/>
      </div>
      <div>
        <SecondHalf/>
      </div>
    </div>
  )
}

export default ProductDetails