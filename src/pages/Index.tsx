import { useState } from "react";
import { TravelForm } from "@/components/TravelForm";
import { TravelItinerary } from "@/components/TravelItinerary";
import { generateTravelPlan, TravelPreferences } from "@/lib/gemini";
import { useToast } from "@/components/ui/use-toast";
import { SettingsDialog } from "@/components/SettingsDialog";

const Index = () => {
  const [itinerary, setItinerary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (preferences: TravelPreferences) => {
    setIsLoading(true);
    try {
      const plan = await generateTravelPlan(preferences);
      setItinerary(plan);
      toast({
        title: "Success!",
        description: "Your travel plan has been generated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-emerald-50 flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-7xl mx-auto py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div className="rounded-full bg-travel-primary/10 p-2 mb-4">
            <svg width="56" height="56" fill="none" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28" fill="#2D9CDB" fillOpacity="0.15"/><path d="M28 14c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14zm0 25.2c-6.187 0-11.2-5.013-11.2-11.2S21.813 16.8 28 16.8 39.2 21.813 39.2 28 34.187 39.2 28 39.2z" fill="#2D9CDB"/><path d="M28 20.8a7.2 7.2 0 100 14.4 7.2 7.2 0 000-14.4zm0 11.2a4 4 0 110-8 4 4 0 010 8z" fill="#2D9CDB"/></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-travel-primary mb-2 text-center drop-shadow-sm">AI Travel Planner</h1>
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-2">Plan your perfect trip with AI. Get personalized itineraries, real-time flights, and travel tips in seconds.</p>
          <SettingsDialog />
        </div>
        {/* Form Section */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 md:p-10 mb-8 animate-fade-in border border-gray-100">
          <TravelForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        {/* Itinerary Section */}
        <TravelItinerary itinerary={itinerary} />
      </div>
    </div>
  );
};

export default Index;
