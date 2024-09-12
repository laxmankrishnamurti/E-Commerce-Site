import { useSelector, useDispatch } from "react-redux"
import {decreaseQuantity, increaseQuantity, deleteCartProduct}  from '../../features/cart/cartSlice'
import { RootState } from "../../app/store"
import deleteIcon from '../../assets/delete.png'
import emptyCart from '../../assets/emptyCart.png'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Cart() {
  const [totalItems, setTotalItems] = useState<number>(0)
  const [subTotal, setSubTotal] = useState<number>(0)
  const allCartProducts = useSelector((state: RootState) => state.cartProduct)

  useEffect(() => {
    let total = 0;
    let totalPrice = 0;
    allCartProducts.map((product) => {
      totalPrice += ((product.quantity * product.price) - ((product.quantity * product.price) * product.discount / 100))
      total += product.quantity
    })
    setTotalItems(total)
    setSubTotal(totalPrice)
  },[allCartProducts])

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
      <div className="w-full flex justify-center items-center px-28 h-fit">
        <div className="w-1/2">
           <img src={emptyCart} className="w-full"/>
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
                        className="bg-hbg px-4 rounded-md text-bg text-2xl  hover:brightness-150"
                      > - </button>
                      <span>{product.quantity}</span>
                      <button 
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="bg-hbg px-3 rounded-md text-bg text-2xl hover:brightness-150"
                      > + </button>
                    </div>
                    <div className="text-text">
                      <span> ₹ {((product.quantity * product.price) - ((product.quantity * product.price) * product.discount / 100))}</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 py-4">
                  <button onClick={() => handleDeleteCartProduct(product.id)}>
                    <img src={deleteIcon} className="w-full hover:brightness-125"/>
                  </button>
              </div>
            </div>
          ))
        }
      </div>
      <div className="border-t border-dashed pr-8">
        <div className="flex justify-end p-4 text-cta font-semibold text-lg">
          <span>Subtotal({totalItems}) : </span>
          <span className="pl-4"> ₹ {subTotal}</span>
        </div>
        <div className="flex justify-end p-3">
          <Link to={`/checkout`}>
             <button className="bg-cta px-10 py-2 rounded-md hover:bg-ctah font-semibold shadow shadow-primary">Proceed To Buy</button>
           </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart