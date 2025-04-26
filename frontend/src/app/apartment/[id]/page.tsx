'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApartmentById } from '../../apartment/apartmentService';
import { Apartment } from '../../apartment/apartment';
import { PhoneCall, MessageCircle } from 'lucide-react'; 
import Gallery from "../../components/Gallery";

const ApartmentDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApartment = async () => {
      try {
        const data = await fetchApartmentById(Number(id));
        setApartment(data);
      } catch (error) {
        console.error('Error loading apartment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadApartment();
    }
  }, [id]);

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;
  if (!apartment) return <p className="text-center text-lg py-10">Apartment not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="hover:underline cursor-pointer">Home</span> {'>'} <span className="hover:underline cursor-pointer">New Cairo</span> {'>'} <span className="text-gray-800 font-medium">{apartment.title}</span>
      </div>

      {/* Image and title */}
      <div className="rounded-lg overflow-hidden shadow-md mb-8">
      <Gallery images={apartment.images || []} altPrefix={apartment.title} />

      </div>

      {/* Main info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{apartment.title}</h1>
          <p className="text-gray-600 mt-2">{apartment.developer}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border hover:bg-gray-100 transition">
            <PhoneCall size={20} /> Call Us
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
            <MessageCircle size={20} /> Whatsapp
          </button>
        </div>
      </div>

      {/* Price boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border p-6 rounded-xl text-center">
          <p className="text-gray-500 text-sm mb-2">Developer Start Price</p>
          <p className="text-2xl font-bold text-gray-800">{apartment.price.toLocaleString()} EGP</p>
        </div>
        <div className="border p-6 rounded-xl text-center">
          <p className="text-gray-500 text-sm mb-2">Resale Start Price</p>
          <p className="text-2xl font-bold text-gray-800">{(apartment.price * 0.6).toLocaleString()} EGP</p> {/* Example resale price */}
        </div>
      </div>

      {/* Details section */}
      <div className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <p><span className="font-semibold">Area:</span> {apartment.area} m²</p>
          <p><span className="font-semibold">Bedrooms:</span> {apartment.noOfBedrooms}</p>
          <p><span className="font-semibold">Bathrooms:</span> {apartment.noOfBathrooms}</p>
          <p><span className="font-semibold">City:</span> {apartment.city}</p>
          <p><span className="font-semibold">Sale Type:</span> {apartment.saleType}</p>
          <p><span className="font-semibold">Delivery Date:</span> {apartment.deliveryDate}</p>
        </div>

        {/* Description */}
        <div className="mt-6 text-gray-600">
          {apartment.description}
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;
