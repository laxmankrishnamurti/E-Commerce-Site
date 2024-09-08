interface productType{
  image: string;
  price: number;
  title: string;
}

function Product({product}: {product:productType}) {
 
  const {image, title, price} = product

  return (
    <div className="w-1/4 mb-4">
      <div>
        <img src={image}/>
      </div>
      <div>
        <span>{title}</span>
      </div>
      <div>
        <div><span>{price}</span></div>
        <div>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product