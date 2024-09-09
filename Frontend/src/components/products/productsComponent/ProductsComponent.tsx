import {Filter, Product, Pagination} from '../../index.components'
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
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
      {image:laptopImage, title: "Lenovo ideapad slim-3", price: 24500},
    ]

  return (
    <>
      <div className='w-full px-28 py-8 flex justify-between'>   
        <div className='w-1/4 h-fit bg-bg p-4 rounded-md shadow-lg'>
          <Filter/>
        </div>
        <div className='w-4/6 shadow p-4 rounded-md flex flex-wrap justify-between gap-4'>
          {
            products.map((product, index) => (
              <Product key={index} product={product}/>
            ))
          }
        </div>
      </div>
      <div className="w-full px-28 mt-8 mb-24 flex justify-end">
        <Pagination/>
      </div>
    </>
  )
}

export default ProductsComponent