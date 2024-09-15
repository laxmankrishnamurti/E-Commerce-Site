import React, { useState } from "react"

//Defining the type for key-value pairs that will be generate dynamically
interface KeyValuePairs {
  key: string;
  value: string;
}

//Defining the type for the entire form
interface ProductFormData {
  title: string;
  price: number;
  discount: number;
  category: string;
  description: Record<string, string>; //To hold dynamic key-value pairs
}


function CreateForm() {
  //State for default fields
  const [formData, setFormData] = useState({
    title: " ",
    price: 0,
    discount: 0,
    category: " "
  }) 
  //State to hold dynamic key-value pairs
  const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePairs[]>([{key: '', value: ''},])

  //Handle changes for default fields
  const handleDefaultFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  //Handle changes for dynamic key-value inputs
  const handleInputChanges = (index: number, field: 'key' | 'value', value: string) => {
    const newPairs = [...keyValuePairs];
    newPairs[index][field] = value;
    setKeyValuePairs(newPairs);
  }

  //Adding a new dynamic key-value pair when user hit the "Add Product Description"
  const addKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, {key: "", value: ""}])
  }

  //Handling form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Converting dynamic key value pairs into an object
    const dynamicFields: Record<string, string> = keyValuePairs.reduce((acc: Record<string, string>, pair: KeyValuePairs) => {
      if(pair.key) acc[pair.key] = pair.value;
      return acc;
    }, {})

    //Combining default fields with dynamic fields
    const finalData: ProductFormData = {
      title: formData.title,
      price: formData.price,
      discount: formData.discount,
      category: formData.category,
      description: dynamicFields
    }
    console.log("Final Data : ", finalData)
  }

  return (
    <div className='px-4 my-8'>
      <form 
        onSubmit={handleFormSubmit}
        className='w-full flex gap-4 flex-wrap items-center justify-start relative'
      >
        <div className='w-3/5'>
              <label 
                className='text-text text-sm font-semibold' 
                htmlFor='title'
              >Product Title</label>
              <input
                type='text'
                name='title'
                id='title'
                value={formData.title}
                onChange={handleDefaultFieldChange}
                className='w-full shadow shadow-primary px-2 py-2 rounded-md outline-none'
              />
        </div>
        <div className='w-1/5'>
              <label 
                className='text-text text-sm font-semibold' 
                htmlFor='price'
              >Product Price(₹)</label>
              <input
                type='number'
                name='price'
                id='price'
                value={formData.price}
                onChange={handleDefaultFieldChange}
                className='w-full shadow shadow-primary px-2 py-2 rounded-md outline-none'
              />
        </div>
        <div className='w-1/6'>
              <label 
                className='text-text text-sm font-semibold' 
                htmlFor='discount'
              >Discount</label>
              <input
                type='number'
                name='discount'
                id='discount'
                value={formData.discount}
                onChange={handleDefaultFieldChange}
                className='w-full shadow shadow-primary px-2 py-2 rounded-md outline-none'
              />
        </div>
        <div className='w-full flex justify-between items-center'>
          <div className='w-1/6 flex flex-col'>
                <label 
                  className='text-text text-sm font-semibold' 
                  htmlFor='category'
                >Category</label>
                <select
                  name="category" 
                  id='category' 
                  value={formData.category}
                  onChange={handleDefaultFieldChange}
                  className='px-4 py-3 outline-none rounded-md hover:cursor-pointer bg-primary text-bg font-bold text-sm'
                >
                  <option value="">Select a category</option>
                  <option value="books">Books</option>
                  <option value="homeappliences">Home Appliences</option>
                  <option value="laptops">Laptops</option>
                  <option value="shoes">Shoes</option>
                  <option value="bikes">Bikes</option>
                  <option value="clothes">Clothes</option>
                </select>
          </div>
          <div className="flex items-center gap-4">
            {/* <span className="mr-4 text-text"></span> */}
            <div
              onClick={addKeyValuePair}
              className="px-4 py-2 shadow shadow-primary rounded-md cursor-pointer text-sm"
            > + Add product description</div>
            <div className="italic shadow px-3 py-1 rounded-full shadow-primary hover:cursor-pointer" title="You must add description about your product so that customers can understand the product very well.">i</div>
          </div>
        </div>
        <div className="w-full flex justify-between mt-4 flex-wrap gap-4">
          {
            keyValuePairs.map((pair, index) => (
              <div key={index} className="w-full flex justify-between">
                <div className="w-2/5">
                  <label className="block italic font-serif" htmlFor={pair.key}>Properties</label>
                  <input 
                    type="text"
                    value={pair.key}
                    id={pair.key}
                    onChange={(e) => handleInputChanges(index, 'key', e.target.value)}
                     className='w-full shadow shadow-primary px-2 py-2 rounded-md outline-none placeholder:font-mono'
                  />
                </div>
                <div className="w-2/5">
                  <label className="block italic font-serif" htmlFor={pair.value}>Value</label>
                  <input 
                    type="text"
                    value={pair.value}
                    id={pair.value}
                    onChange={(e) => handleInputChanges(index, 'value', e.target.value)}
                     className='w-full shadow shadow-primary px-2 py-2 rounded-md outline-none'
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div className="my-8">
          <button type="submit" className="bg-cta px-16 py-3 rounded-md text-text font-semibold hover:bg-ctah">Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default CreateForm