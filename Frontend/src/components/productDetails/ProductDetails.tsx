import { useParams } from "react-router-dom"
import {FirstHalf, SecondHalf} from './index.productDetails'
import { useEffect, useState } from "react"
import axios, {AxiosResponse} from "axios"

interface product {
  _id: number;
  title: string;
  image: string;
  price: number;
}

function ProductDetails() {
  const [product, setProduct] = useState<product>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    const {_id} = useParams() 
    useEffect(() => {
      const getProduct = async () => {
        try { 
          const response: AxiosResponse<product> = await axios.get(`http://localhost:3000/${_id}`)
          setProduct(response.data)
        } catch (error) {
          setError('error while fetching a single product')
        }finally {
          setLoading(false)
        }
      }
      getProduct()
    }, [_id])

    if(loading){
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
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

  return (
    <div className="mx-28 my-8 p-3 h-fit">
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