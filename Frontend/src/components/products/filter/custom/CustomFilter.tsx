import { useEffect, useState } from "react";
import { FilterProps } from "../Filter";
import { filterCategory } from '../config/FilterConfig';


function CustomFilter({category}: FilterProps) {

    const [trimCategory, setTrimCategory] = useState("")

    useEffect(() => {
        let trim = "";
        if(category){
            for(let i = 0; i < category.length; i++){
                if(category.charAt(i) !== " "){
                    trim += category.charAt(i)
                }
            }
        }
        setTrimCategory(trim)
        console.log(trimCategory)
    }, [category])

  const productCategoryFilter = category ? filterCategory[trimCategory] : [];

  return (
    <>
    {
        productCategoryFilter && productCategoryFilter.map((filter, index) => (
          <div key={index} className='mb-4'>
            <div>
              <span className='font-semibold text-text'>{filter.label}</span>
            </div>
            <div className='flex justify-between gap-4 flex-wrap mt-2'>
              {
                filter.options.map((filElm, index) => (
                  <div key={index}>
                    <button className='s-price font-medium'>{filElm}</button>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </>
  )
}

export default CustomFilter