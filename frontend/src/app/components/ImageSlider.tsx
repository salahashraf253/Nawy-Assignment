import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: { url: string }[];
  altPrefix?: string;
  heightClass?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  altPrefix = "Image",
  heightClass = "h-64",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const openModal = (url: string) => {
    setActiveImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  const sliderSettings = {
    dots: images.length > 1,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: images.length > 1,
  };

  if (!images || images.length === 0) {
    return (
      <div
        className={`${heightClass} flex items-center justify-center bg-gray-200 text-gray-400`}
      >
        No Image Available
      </div>
    );
  }

  return (
    <>
      {images.length === 1 ? (
        <img
          src={images[0].url}
          alt={`${altPrefix} 1`}
          className={`object-cover w-full ${heightClass} cursor-pointer`}
          onClick={() => openModal(images[0].url)}
        />
      ) : (
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img.url}
                alt={`${altPrefix} ${index + 1}`}
                className={`object-cover w-full ${heightClass} cursor-pointer`}
                onClick={() => openModal(img.url)}
              />
            </div>
          ))}
        </Slider>
      )}

      {/* Modal */}
      {isModalOpen && activeImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="max-w-3xl w-full p-4">
            <img
              src={activeImage}
              alt="Expanded"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
