import HotelCard from "./HotelCard";

export default function Hotels({ trip }) {
  return (
    <div className="container mx-auto px-4 dark:bg-gray-900">
      <h2 className="font-bold text-2xl md:text-3xl my-8 dark:text-white">Hotel Recommendations</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCard hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
}