import { useParams } from "react-router-dom"
import {FirstHalf, SecondHalf} from './index.productDetails'
import { useEffect, useState } from "react"
import axios, {AxiosResponse} from "axios"
import { useDispatch } from "react-redux";
import {setSingleProduct} from '../../features/singleProduct/singleProductSlice'

// shortDetails: {
//   Brand?: string;  // Known key, but optional
//   ModelName?: string;  // Known key, but optional
//   [key: string]: any;  // Allow any other keys
// };

// description: {
//   Manufacturer?: string;  // Known key, but optional
//   [key: string]: any;  // Allow any other keys
// };


interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  shortDetails: Record<string, any>;
  description: Record<string, any>
}

function ProductDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    const {_id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      const getProduct = async () => {
        try { 
          const response: AxiosResponse<Product[]> = await axios.get(`http://localhost:3000/laptops`);
          const responseArr: Product[] = Array.from(response.data)
          let product = responseArr.filter((product) => product.id === Number(_id))
          dispatch(setSingleProduct(product[0]))
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