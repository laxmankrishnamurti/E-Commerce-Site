import { useParams } from "react-router-dom"

function ProductDetails() {

    const params = useParams() 
    console.log("Parrams value in product details page : ", params)

  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails