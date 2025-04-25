import React from "react";
import Slider from "react-slick";
import { Apartment } from '../apartment/apartment'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const {
    title,
    description,
    price,
    deliveryDate,
    developer,
    area,
    noOfBathrooms,
    noOfBedrooms,
    saleType,
    city,
    images,
  } = apartment;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md mb-6">
      <div className="relative h-64 w-full bg-gray-200">
        {images && images.length > 0 ? (
          <Slider {...sliderSettings}>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.url}
                  alt={`${title} Image ${index + 1}`}
                  className="object-cover w-full h-64"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">{description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
          <p><span className="font-semibold">Price:</span>  {price} EGP</p>
          <p><span className="font-semibold">Area:</span> {area} m²</p>
          <p><span className="font-semibold">Bedrooms:</span> {noOfBedrooms}</p>
          <p><span className="font-semibold">Bathrooms:</span> {noOfBathrooms}</p>
          <p><span className="font-semibold">City:</span> {city}</p>
          <p><span className="font-semibold">Sale Type:</span> {saleType}</p>
        </div>

        <p className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Developer:</span> {developer}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Delivery Date:</span>{" "}
          {new Date(deliveryDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ApartmentCard;
