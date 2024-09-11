import {Filter, Product, Pagination} from './index.products.components'
import { useEffect, useState } from 'react'
import axios, {AxiosResponse} from 'axios'
import { useParams} from 'react-router-dom'


interface Products {
  id: number;
  image: string;
  title: string;
  price: number;
  discount: number;
  quantity: number;
}

function ProductsComponent() {
    const [products, setProducts] = useState<Products[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

  let {category} = useParams<{category: string}>()
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response: AxiosResponse<Products[]> = await axios.get('http://localhost:3000/laptops')
          setProducts(response.data)
        } catch (error) {
          setError('Error while fetching products')
        } finally {
          setLoading(false)
        }
      }
      fetchProducts()
    }, [])

    //Conditional rendering based on state
    if(loading){
      return (
        <div className='w-full p-4 text-center font-semibold text-text'>
          <span>Loading products.....</span>
        </div>
      )
    }

    if(error){
      return (
        <div>
          <span>{error}</span>
        </div>
      )
    }

  //Rendering all products
  return (
    <>
        <div className='mx-28 my-8 flex justify-between'>   
          <div className='w-1/4 h-fit bg-bg p-4 rounded-md shadow-lg'>
            <Filter category={category}/>
          </div>
          <div className='w-4/6 shadow p-4 rounded-md flex flex-wrap justify-between gap-4'>
            {
              products.map((product, index) => (
                  <Product product={product} key={index}/>
                
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