import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

export default function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      getPlacePhoto();
    }
  }, [hotel]);

  const getPlacePhoto = async () => {
    if (!hotel?.name) {
      console.error("No location label found in hotel data");
      return;
    }

    const data = {
      textQuery: hotel?.name,
    };

    try {
      const placeDetails = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        placeDetails.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.name + ',' + hotel?.address)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
        <div className="w-full pt-[56.25%] relative overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={photoUrl}
            alt={hotel?.name || "Hotel"}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="font-bold text-base md:text-lg mb-2 line-clamp-2 dark:text-white">{hotel?.name}</h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-1">📍 {hotel?.address}</p>
          <div className="mt-auto flex justify-between items-center">
            <p className="text-xs md:text-sm text-[#0085FF] dark:text-[#0085FF]">💰 {hotel?.price || "Data Unavailable"}</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">⭐ {hotel?.rating || "Data Unavailable"}</p>
          </div>
        </div>
      </div>
    </a>
  );
}