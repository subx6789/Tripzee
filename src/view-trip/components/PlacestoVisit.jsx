import PlaceCardItem from "./PlaceCardItem";

export default function PlacestoVisit({ trip }) {
  return (
    <div className="container mx-auto px-4 my-12 dark:bg-gray-900">
      <h2 className="font-bold text-2xl md:text-3xl mb-8 dark:text-white">Places to Visit</h2>
      <div className="space-y-12">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-xl md:text-2xl mb-6 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg dark:text-white">Day {item?.day} ({item?.description})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item?.plan?.map((place, placeIndex) => (
                <div key={placeIndex} className="mb-6">
                  <h4 className="font-medium text-base md:text-lg text-[#0085FF] dark:text-[#0085FF] mb-2">{place.time}</h4>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}