import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../service/FirebaseConfig.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useDarkMode } from "../../DarkModeContext";
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
} from "@/components/ui/alert-dialog";

export default function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.error("Login failed:", error),
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to get user profile:", err.message);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const deleteUserAccount = async () => {
    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
      handleLogout();
    } catch (error) {
      console.error("Failed to delete user account:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto sm:h-10" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Tripzee
              </span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              className="rounded-md p-2"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </Button>
          </div>
          {user && (
            <nav className="hidden md:flex space-x-10">
              <Link
                to="/create-trip"
                className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Create Trip
              </Link>
              <Link
                to="/my-trips"
                className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                My Trips
              </Link>
            </nav>
          )}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              className="mr-4"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </Button>
            {user ? (
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user.picture}
                    alt={`${user.name}'s avatar`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="py-1">
                    <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                      {user.name}
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="block w-full rounded-xl text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                          Log Out
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:bg-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will log out your
                            account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-[#0085FF]"
                            onClick={handleLogout}
                          >
                            Log Out
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="block w-full rounded-xl text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                          Delete Account
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="dark:bg-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-[#0085FF]"
                            onClick={deleteUserAccount}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button onClick={() => setOpenDialog(true)}>Get Started</Button>
            )}
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user && (
            <>
              <Link
                to="/create-trip"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Create Trip
              </Link>
              <Link
                to="/my-trips"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                My Trips
              </Link>
            </>
          )}
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            className="w-full justify-start"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <FaSun className="h-5 w-5 mr-2" />
            ) : (
              <FaMoon className="h-5 w-5 mr-2" />
            )}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          {!user && (
            <Button onClick={() => setOpenDialog(true)} className="w-full">
              Get Started
            </Button>
          )}
        </div>
        {user && (
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.picture}
                  alt={`${user.name}'s avatar`}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                    Log Out
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="dark:bg-gray-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will log out your
                      account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#0085FF]"
                      onClick={handleLogout}
                    >
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                    Delete Account
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="dark:bg-gray-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#0085FF]"
                      onClick={deleteUserAccount}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Sign In with Google
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <div className="flex gap-2 items-center my-5">
                  <img
                    src="/logo.svg"
                    alt="logo"
                    className="h-8 w-auto sm:h-10"
                  />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Tripzee
                  </span>
                </div>
                <p className="text-center mb-6">
                  Sign in with your Google account to continue.
                </p>
                <Button
                  onClick={() => login()}
                  className="w-full flex items-center justify-center gap-2"
                  variant="outline"
                >
                  <FcGoogle className="h-5 w-5" />
                  Sign In with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}
