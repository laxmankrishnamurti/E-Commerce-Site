import {Filter, ProductLists} from '../../index.components'
import { useParams } from 'react-router-dom'

function ProductsComponent() {

    const {category} = useParams()

  return (
    <div>   
        <Filter/>
        <ProductLists/>
    </div>
  )
}

export default ProductsComponent