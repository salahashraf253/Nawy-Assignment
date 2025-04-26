import React from "react";
import { Apartment } from '../apartment/apartment'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ImageSlider from "./ImageSlider";

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

  return (
    <Link href={`/apartment/${apartment.id}`} className="no-underline text-black">
    <div className="border rounded-lg overflow-hidden shadow-md mb-6">
      <div className="relative h-64 w-full bg-gray-200">
      <ImageSlider images={images || []} altPrefix={title} heightClass="h-64" />
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
    </Link>
  );
};

export default ApartmentCard;
