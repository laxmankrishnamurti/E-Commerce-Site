import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store"
import {setCartProduct} from '../../../features/cart/cartSlice'

function ActionButton() {
  const product = useSelector((state: RootState) => state.singleProduct);
  const cartProduct = useSelector((state:RootState) => state.cartProduct)
  console.log("cartProduct : ", cartProduct)
  const productInfo = {
    id: product.id,
    title: product.title,
    image: product.image,
    discount: product.discount,
    price: product.price,
    quantity: 1
  }

  const dispatch = useDispatch()
  const handleCartDispatch = () => {
    dispatch(setCartProduct(productInfo))
  }

  return (
    <div className="w-1/2 p-2 flex justify-between">
      <div>
        <button onClick={handleCartDispatch} className="px-8 py-2 bg-bg text-text font-semibold hover:bg-bgh rounded-md ">Add to cart</button>
      </div>
      <div>
        <button className="px-8 py-2 bg-cta hover:bg-ctah text-text font-semibold rounded-md">Buy Now</button>
      </div>
    </div>
  )
}

export default ActionButton