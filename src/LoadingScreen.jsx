import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LoadingScreen = ({ onLoadingComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <div className="relative w-64 h-16 mb-4 mx-auto">
          <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900 rounded-full"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="h-0.5 w-full bg-blue-500 dark:bg-blue-300"></div>
          </div>
          <FaMapMarkerAlt className="text-3xl text-red-500 absolute top-1/2 left-0 transform -translate-y-1/2 animate-travel" />
        </div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Mapping Your Journey
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Charting the course to your adventures...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
