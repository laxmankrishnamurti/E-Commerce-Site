import { useEffect, useState } from "react";
import { RootState } from "../../../app/store"
import { useSelector } from "react-redux"

function ProductShortDescription() {
  const [discountedPrice, setDiscountedPrice] = useState<number>(0)
  const product = useSelector((state: RootState) => state.singleProduct);
  const [rating, setRating] = useState<number>(0);
  const ratingSymbol = "⭐";

  useEffect(() => {
    if(product.rating){
      setRating(Math.floor(product.rating))
      setDiscountedPrice((product.price) - (product.price * product.discount / 100))
    }
  }, [])

  const keys = Object.getOwnPropertyNames(product.shortDetails);

  return (
    <div>
      <div className="my-4">
        <span className="text-2xl text-text font-semibold">{product.title}</span>
      </div>
      <div className="my-2">
        <span>{product.rating} {ratingSymbol.repeat(rating)}</span>
      </div>
      <div className="mt-4">
        <span><del>₹{product.price}</del></span>
        <span className="mx-4">₹{discountedPrice}</span>
      </div>
      <div className="w-full border border-bg my-4"></div>
        <div className="">
          {
            keys.map((key) => (
              <div key={key} className="my-2 flex justify-between">
                <span className="text-text font-semibold">{key}</span><span className="text-primary">{product.shortDetails[key]}</span>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default ProductShortDescription