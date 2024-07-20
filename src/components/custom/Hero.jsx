import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-9">
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left">
              <span className="text-[#0085FF] dark:text-[#40A9FF]">
                Discover Your Next Adventure with AI:
              </span>{" "}
              Personalized Itineraries at Your Fingertips
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-center lg:text-left mt-6">
              Your personal trip planner and travel curator, creating custom
              itineraries tailored to your interests and budget.
            </p>
            <Link to="/create-trip" className="mt-8">
              <Button size="lg" className="px-8 py-3 text-lg">Get Started</Button>
            </Link>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="Monitor XDR.png"
              alt="AI-powered trip planning interface"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}