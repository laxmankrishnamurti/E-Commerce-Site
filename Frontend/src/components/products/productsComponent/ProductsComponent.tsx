import {Filter, Product} from '../../index.components'
import { useParams } from 'react-router-dom'
import laptopImage from '../../../../public/lenovo.jpg'

function ProductsComponent() {

    const {category} = useParams()
    console.log("Parrameter is : ", category)

    const products = [
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
    ]

  return (
    <div className='w-full px-28 py-8 flex justify-between'>   
        <div className='w-1/4 h-96 bg-bg p-3 rounded-md shadow-lg'>
          <Filter/>
        </div>
        <div className='w-4/6 shadow-lg p-4 rounded-md flex flex-wrap justify-between gap-4'>
          {
            products.map((product, index) => (
              <Product key={index} product={product}/>
            ))
          }
        </div>
    </div>
  )
}

export default ProductsComponent