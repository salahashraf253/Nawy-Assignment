import React, { useState } from 'react';

interface GalleryProps {
  images: { url: string }[];
  altPrefix?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, altPrefix = "Image" }) => {
    console.log(images);  
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-200 text-gray-400">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex rounded-2xl overflow-hidden shadow-lg h-[400px]">
      {/* Main big image */}
  {/* Big main image */}
  <div className="w-full md:w-3/5">
    <img
      src={images[selectedImage].url}
      alt={`${altPrefix} Main`}
      className="rounded-lg object-cover w-full h-[500px]"
    />
  </div>

  {/* Thumbnails */}
  <div className="w-full md:w-2/5 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[500px]">
    {images.map((img, idx) => (
      <div
        key={idx}
        onClick={() => setSelectedImage(idx)}
        className={`cursor-pointer border-2 ${selectedImage === idx ? "border-blue-500" : "border-transparent"} rounded-lg overflow-hidden`}
      >
        <img
          src={img.url}
          alt={`${altPrefix} ${idx + 1}`}
          className="w-32 h-24 md:w-full md:h-32 object-cover"
        />
      </div>
    ))}
  </div>
</div>

  );
};

export default Gallery;