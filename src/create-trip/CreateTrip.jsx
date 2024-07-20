import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/Options.js";
import { useToast } from "@/components/ui/use-toast";
import { chatSession } from "../service/AIModel.js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/FirebaseConfig.js";
import { useNavigate } from "react-router-dom";
export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      getUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !(
        formData?.noOfDays >= 1 &&
        formData?.noOfDays <= 6 &&
        formData?.location &&
        formData?.budget &&
        formData?.traveler
      )
    ) {
      toast({
        title: "Incomplete data",
        description: "Please fill all the details correctly",
      });
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "${location}",
      formData?.location?.label
    )
      .replace("${totalDays}", formData?.noOfDays)
      .replace("${budget}", formData?.budget)
      .replace("${traveler}", formData?.traveler)
      .replace("${totalDays}", formData?.totalDays);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: `Application/json`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      onGenerateTrip();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences 🚙
        </h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just Provide some basic information, and our advanced AI trip planner
          will generate a customized itinerary based on your preferences.
        </p>
        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your destination?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
                styles: {
                  input: (provided) => ({
                    ...provided,
                    transition: "border-color 0.2s",
                    "&:focus": {
                      borderColor: "#007bff",
                      outline: "none",
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                    color: "black",
                    padding: "8px 12px",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                },
              }}
              className="w-full"
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              For how many days are you planning your trip?
            </h2>
            <Input
              placeholder={
                "Just type the number of days like: 4 (Enter days from 1 to 6 only)"
              }
              type="number"
              onChange={(e) => {
                handleInputChange("noOfDays", e.target.value);
              }}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleInputChange("budget", item.title);
                    }}
                    className={`p-4 border cursor-pointer duration-200 rounded-lg hover:shadow-lg ${
                      formData?.budget == item.title &&
                      `shadow-lg border-orange-600`
                    }`}
                  >
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                    <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan to travelling on your next adventure?
            </h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 mt-5">
              {SelectTravelesList.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleInputChange("traveler", item.people);
                    }}
                    className={`p-4 border cursor-pointer duration-200 rounded-lg hover:shadow-lg ${
                      formData?.traveler == item.people &&
                      `shadow-lg border-orange-600`
                    }`}
                  >
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                    <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-10 flex justify-end">
            <Button disabled={loading} onClick={onGenerateTrip}>
              {loading ? (
                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogTitle />
            <DialogHeader>
              <DialogDescription>
              <div className="flex gap-2 items-center my-5">
                <img src="/logo.svg" alt="logo" className="h-8 w-auto sm:h-10" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Tripzee</span>
                </div>
                <div className="font-bold text-lg mt-7">
                  Sign In with <span className="text-[#0085FF]">Google</span>
                </div>
                <div>Sign In with your google account to continue.</div>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-2 items-center"
                  variant="outline"
                >
                  <FcGoogle className="h-5 w-5" />
                  Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
