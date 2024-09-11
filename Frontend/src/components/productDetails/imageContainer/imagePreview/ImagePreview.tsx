import { useEffect, useState } from 'react';
import { RootState } from '../../../../app/store';
import { useSelector } from 'react-redux';


function ImagePreview() {
  const product = useSelector((state: RootState) => state.singleProduct);
  const [hoveredImage, setHoveredImage] = useState('');
  const [hoveredClass, setHoveredClass] = useState('');

  const images = [
    {src : product.image, class: ''},
    {src : product.image, class: 'rotate-45'},
    {src : product.image, class: '-rotate-90'},
    {src : product.image, class: 'rotate-180'},
  ]

  useEffect(() => {
    if(product.image) {
      setHoveredImage(product.image)
    }
  }, [product.image])

  return (
    <div className=' p-4 flex justify-between gap-8'>
      {/* Small Image Thumbnails */}
      <div className='flex flex-col gap-2'>
        {images.map((image, index) => (
          <div
            key={index}
            className='w-12 h-12 p-1 bg-bg rounded-md hover:cursor-pointer'
            onMouseEnter={() => {
              setHoveredImage(image.src);
              setHoveredClass(image.class);
            }}
            onMouseLeave={() => {
              setHoveredImage(product.image)
              setHoveredClass("")
            }}
          >   
            <img src={image.src} className={`w-full h-full ${image.class}`} />
          </div>
        ))}
      </div>
      {/* Large Image Preview */}
      <div className='h-fit p-2 bg-gray-200 rounded-md flex'>
        <img src={hoveredImage} alt="Preview" className={`w-full h-full object-cover ${hoveredClass}`} />
        <div>
          <span className='text-discount text-lg'>{`-${product.discount}%`}</span>
          <span className='text-discount text-sm'>Off</span>
      </div>
      </div>
      
  </div>
  )
}

export default ImagePreview