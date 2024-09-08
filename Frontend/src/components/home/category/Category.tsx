import { Link } from "react-router-dom";

interface CategoryProps {
    title: string;
    image: string;
}

function Category({title, image}:CategoryProps) {
  return (
    <Link to={`#`}>
        <div className="w-80 h-72 my-8 p-4 flex flex-col rounded-md shadow-md hover:shadow-2xl transition duration-200 ease-in">
          <div className="font-semibold mb-4 text-text">{title}</div>
          <div>
              <img src={image} className="rounded-md"/>
          </div>
        </div>
    </Link>
  )
}

export default Category