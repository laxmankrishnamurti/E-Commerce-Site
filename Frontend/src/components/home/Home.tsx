import {Hero, Category} from './index.homecomponents';
import educationImage from '/books.jpg';
import homeappliencesImage from '/home-appliences.jpg';
import laptopImage from '/lenovo.jpg';
import bikeImage from '/bikes.jpg';
import clothesImage from '/clothes.jpg';
import shoesImage from '/hero-shoes.jpg';

function Home() {

  let categories = [
    {_id: 1,title: "Books", image: educationImage}, 
    {_id: 2,title: "Home Appliences", image: homeappliencesImage}, 
    {_id: 3,title: "Laptops", image: laptopImage}, 
    {_id: 4,title:"Shoes", image: shoesImage}, 
    {_id: 5,title: "Bikes", image: bikeImage}, 
    {_id: 6,title: "Clothes", image: clothesImage}
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
              <Category key={index} category={category}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home