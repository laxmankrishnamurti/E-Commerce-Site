import {Filter, ProductLists} from '../../index.components'
import { useParams } from 'react-router-dom'

function ProductsComponent() {

    const {category} = useParams()
    console.log("Parrameter is : ", category)

  return (
    <div>   
        <Filter/>
        <ProductLists/>
    </div>
  )
}

export default ProductsComponent