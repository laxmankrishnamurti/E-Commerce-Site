import { useSelector, useDispatch } from 'react-redux';
import {setCartProduct} from '../../../features/cart/cartSlice'
import { RootState } from "../../../app/store"
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom'

interface productType{
  id: number;
  image: string;
  title: string;
  price: number;
  discount: number;
  quantity: number;
}

function Product({product}: {product:productType}) {
  const {image, title, price, id, discount} = product
  let {category} = useParams<{category: string}>()

  const data = useSelector((state: RootState) => state.cartProduct)
  console.log("cartProducts : ", data)
  const dispatch = useDispatch()
  
  const productInfo = {
    id: id,
    title: title,
    image: image,
    discount: discount,
    price: price,
    quantity: 1
  }

  const handleCartDispatch = () => {
    dispatch(setCartProduct(productInfo))
  }


  return (
    <div className="w-56 mb-4 flex flex-col gap-2 shadow p-4">

      <Link to={`/products/${category}/${product.id}`}>
        <div className="w-full">
          <img src={image} className="w-full"/>
        </div>
        <div className="text-text text-sm font-semibold">
          <span>{title}</span>
        </div>
      </Link>
      <div>
        <div className="flex items-center justify-between mt-4">
          <div><span> ₹{price}</span></div>
          <div>
            <button onClick={handleCartDispatch} className="bg-cta text-sm hover:bg-ctah px-4 py-2 rounded-md text-text font-semibold">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product