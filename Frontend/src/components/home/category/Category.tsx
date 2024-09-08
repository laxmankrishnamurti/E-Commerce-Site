
interface CategoryProps {
    title: string;
    image: string;
}

function Category({title, image}:CategoryProps) {
  return (
    <div className="w-80">
        <div>{title}</div>
        <div>
            <img src={image}/>
        </div>
    </div>
  )
}

export default Category