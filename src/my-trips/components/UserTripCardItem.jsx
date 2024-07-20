import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../service/FirebaseConfig";
import { FaTrashAlt } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();
  const { toast } = useToast();

  useEffect(() => {
    if (trip) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    if (!trip?.userSelection?.location?.label) {
      console.error("No location label found in trip data");
      return;
    }

    const data = {
      textQuery: trip?.userSelection?.location?.label,
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

  const handleDelete = async () => {
    if (!trip?.id) {
      console.error("No trip ID found");
      return;
    }
    try {
      await deleteDoc(doc(db, "AITrips", trip.id));
      toast({
        title: "Trip deleted",
        description: "The trip has been deleted successfully.",
      });
      onDelete(trip.id);
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the trip.",
      });
    }
  };

  return (
    <div className="relative h-full">
      <Link to={`/view-trip/${trip?.id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
          <div className="w-full pt-[56.25%] relative overflow-hidden">
            {photoUrl && (
              <img
                src={photoUrl}
                alt="img"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="font-bold text-base md:text-lg mb-2 line-clamp-2 dark:text-white">
              {trip?.userSelection?.location?.label}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-1">
              {trip?.userSelection?.noOfDays} Days Trip with{" "}
              {trip?.userSelection?.budget} Budget
            </p>
          </div>
        </div>
      </Link>
      <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button
        className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-xl shadow-md hover:bg-red-700 transition duration-300"
      >
        <FaTrashAlt />
      </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            trip data and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-[#0085FF]" onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}
