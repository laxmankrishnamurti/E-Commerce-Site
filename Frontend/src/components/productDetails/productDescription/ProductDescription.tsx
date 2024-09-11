import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"

function ProductDescription() {
  const product = useSelector((state: RootState) => state.singleProduct)
  const keys = Object.getOwnPropertyNames(product.description)

  return (
    <div>
      <div className="text-text text-2xl font-semibold my-4">
        <span>Product Details</span>
      </div>
      <div>
        {
          keys.map((key) => (
            <div key={key} className="w-full flex">
              <div className="text-center border-t w-1/2 p-2 bg-bg font-semibold text-text"><span>{key}</span></div>
              <div className="text-center border-t w-1/2 p-2 text-sm"><span>{product.description[key]}</span></div>
            </div>
          ))
        }
        <div className="border-b"></div>
      </div>
    </div>
  )
}

export default ProductDescription