import {Hero, Category} from './index.homecomponents';
import educationImage from '../../../public/books.jpg';
import homeappliencesImage from '../../../public/home-appliences.jpg';
import laptopImage from '../../../public/lenovo.jpg';
import bikeImage from '../../../public/bikes.jpg';
import clothesImage from '../../../public/clothes.jpg';
import shoesImage from '../../../public/hero-shoes.jpg';

function Home() {

  let categories = [
    {title: "Books", image: educationImage}, 
    {title: "Home Appliences", image: homeappliencesImage}, 
    {title: "Laptops", image: laptopImage}, 
    {title:"Shoes", image: shoesImage}, 
    {title: "Bikes", image: bikeImage}, 
    {title: "Clothes", image: clothesImage}
  ]

  return (
    <>
      <Hero/>
      <div className="px-40 py-8">
        <div>
          <span className="text-3xl text-text font-semibold">Categories</span>
        </div>
        <div className='my-4 flex w-full flex-wrap justify-between'>
          {
            categories.map((category, index) => (
              <Category key={index} title={category.title} image={category.image}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home