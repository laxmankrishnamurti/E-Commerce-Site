import { RootState } from "../../../app/store"
import { useSelector } from "react-redux"

function ProductShortDescription() {
  const product = useSelector((state: RootState) => state.singleProduct);

  return (
    <div>
      <div>
        <span>{product.title}</span>
      </div>
      <div>
        <span></span>
      </div>
    </div>
  )
}

export default ProductShortDescription