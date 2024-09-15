import { useState } from "react";
import CreateForm from "../createForm/CreateForm";
import emptyCart from '../../../assets/emptyCart.png'


function CreateHeader() {
  const [addProductForm, setAddProductForm] = useState<string>("hidden")

  const handleAddProductForm = () => {
    if(addProductForm === "hidden"){
      setAddProductForm("visible")
    }else if(addProductForm === "visible"){
      setAddProductForm("hidden")
    }
  }

  return (
    <div>
      <div className='shadow flex justify-between items-center p-4'>
        <div>
          <span className='text-lg'>Add new products</span>
        </div>
        <div>
          <button
             onClick={handleAddProductForm}
             className='bg-cta px-8 py-2 rounded-md font-semibold text-text hover:bg-ctah'
          >New</button>
        </div>
      </div>
      {
        addProductForm === "hidden" ? (
          <div className="w-full flex justify-center items-center">
            <img src={emptyCart} className="w-1/2"/>
          </div>
        ) : (
          <div className={`${addProductForm}`}>
            <CreateForm/>
          </div>
        )
      }
    </div>
  )
}

export default CreateHeader