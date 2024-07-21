import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/FirebaseConfig.js";
import UserTripCardItem from "./components/UserTripCardItem.jsx";
import LoadingScreen from "../LoadingScreen.jsx";

export default function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/");
        return;
      }
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      setUserTrips(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching user trips:", error);
    } finally {
      setDataFetched(true);
    }
  };

  const handleDelete = (id) => {
    setUserTrips(userTrips.filter((trip) => trip.id !== id));
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
    <div className="container sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-2xl md:text-3xl my-8 dark:text-white">My Trips</h2>
      {userTrips.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTrips.map((trip, i) => (
            <UserTripCardItem key={i} trip={trip} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No trips created yet</p>
        </div>
      )}
    </div>
  );
}