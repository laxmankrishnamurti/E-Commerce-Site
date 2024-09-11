
function ActionButton() {
  return (
    <div className="w-1/2 p-2 flex justify-between">
      <div>
        <button className="px-8 py-2 bg-bg text-text font-semibold hover:bg-bgh rounded-md ">Add to cart</button>
      </div>
      <div>
        <button className="px-8 py-2 bg-cta hover:bg-ctah text-text font-semibold rounded-md">Buy Now</button>
      </div>
    </div>
  )
}

export default ActionButton