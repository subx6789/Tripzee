import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/FirebaseConfig.js";
import { useToast } from "@/components/ui/use-toast";
import Information from "../components/Information";
import Hotels from "../components/Hotels";
import PlacestoVisit from "../components/PlacestoVisit";
import Footer from "../components/Footer";
import LoadingScreen from "../../LoadingScreen.jsx";

export default function ViewTrip() {
  const { tripId } = useParams();
  const { toast } = useToast();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        console.log("No such Document found");
        toast({
          title: "Error 404",
          description: "No trip found",
        });
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch trip data",
      });
    } finally {
      setDataFetched(true);
    }
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (!dataFetched) {
    return null;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56 dark:bg-gray-900">
      <Information trip={trip} />
      <Hotels trip={trip} />
      <PlacestoVisit trip={trip}/>
      <Footer/>
    </div>
  );
}