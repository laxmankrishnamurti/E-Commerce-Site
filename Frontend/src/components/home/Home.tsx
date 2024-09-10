import {Hero, Category} from './index.homecomponents';
import educationImage from '/books.jpg';
import homeappliencesImage from '/home-appliences.jpg';
import laptopImage from '/lenovo.jpg';
import bikeImage from '/bikes.jpg';
import clothesImage from '/clothes.jpg';
import shoesImage from '/hero-shoes.jpg';

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