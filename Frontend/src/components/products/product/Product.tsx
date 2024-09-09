interface productType{
  image: string;
  price: number;
  title: string;
}

function Product({product}: {product:productType}) {
 
  const {image, title, price} = product

  return (
    <div className="w-56 mb-4 flex flex-col gap-2 shadow p-4 ">
      <div className="w-full">
        <img src={image} className="w-full"/>
      </div>
      <div>
        <div className="text-text text-sm font-semibold">
          <span>{title}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div><span> ₹{price}</span></div>
          <div>
            <button className="bg-cta text-sm hover:bg-ctah px-4 py-2 rounded-md text-text font-semibold">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product