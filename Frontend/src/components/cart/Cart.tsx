import { useSelector, useDispatch } from "react-redux"
import {decreaseQuantity, increaseQuantity, deleteCartProduct}  from '../../features/cart/cartSlice'
import { RootState } from "../../app/store"
import deleteIcon from '../../assets/delete.png'
import emptyCart from '../../assets/emptyCart.png'

function Cart() {
  const allCartProducts = useSelector((state: RootState) => state.cartProduct)

  const dispatch = useDispatch()

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity({id: id}))
  }

  const handleIncreaseQuantity = (id:number) => {
    dispatch(increaseQuantity({id: id}))
  }

  const handleDeleteCartProduct = (id:number) => {
    dispatch(deleteCartProduct({id: id}))
  }

  if(allCartProducts.length === 0){
    return(
      <div className="mx-28 h-fit">
        <div>
        <img src={emptyCart}/>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-28 p-4 h-fit bg-bg my-8 rounded-md">
      <div>
        <h1 className="text-2xl text-text font-semibold">Shopping Cart</h1>
      </div>
      <div>
        {
          allCartProducts.map((product, index) => (
            <div className="flex justify-between">
                <div key={index} className="flex my-4 gap-16 py-4">
                  <div className="max-w-52">
                    <img src={`${product.image}`}  className="w-full"/>
                  </div>
                  <div className="flex flex-col gap-12">
                    <div>
                      <span className="text-2xl font-semibold text-text">{product.title}</span>
                    </div>
                    <div className="w-fit flex gap-4 items-center p-1 rounded-md">
                      <button 
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="bg-hbg px-4 rounded-md text-bg text-2xl"
                      > - </button>
                      <span>{product.quantity}</span>
                      <button 
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="bg-hbg px-3 rounded-md text-bg text-2xl"
                      > + </button>
                    </div>
                    <div className="text-text">
                      <span> ₹ {(product.price) - (product.price * product.discount / 100)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 py-4">
                  <button onClick={() => handleDeleteCartProduct(product.id)}>
                    <img src={deleteIcon} className="w-full"/>
                  </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Cart