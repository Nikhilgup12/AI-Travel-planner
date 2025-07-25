import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { TravelPreferences } from "@/lib/gemini";

interface TravelFormProps {
  onSubmit: (preferences: TravelPreferences) => void;
  isLoading: boolean;
}

export function TravelForm({ onSubmit, isLoading }: TravelFormProps) {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: 1,
    interests: "",
    includeTransportation: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="source">Source Location</Label>
          <Input
            id="source"
            required
            value={preferences.source}
            onChange={(e) =>
              setPreferences({ ...preferences, source: e.target.value })
            }
            placeholder="e.g., New York"
            className="rounded-lg border-gray-300 focus:border-travel-primary focus:ring-2 focus:ring-travel-primary/30 transition"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            required
            value={preferences.destination}
            onChange={(e) =>
              setPreferences({ ...preferences, destination: e.target.value })
            }
            placeholder="e.g., Paris"
            className="rounded-lg border-gray-300 focus:border-travel-primary focus:ring-2 focus:ring-travel-primary/30 transition"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            required
            value={preferences.startDate}
            onChange={(e) =>
              setPreferences({ ...preferences, startDate: e.target.value })
            }
            className="rounded-lg border-gray-300 focus:border-travel-primary focus:ring-2 focus:ring-travel-primary/30 transition"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            required
            value={preferences.endDate}
            onChange={(e) =>
              setPreferences({ ...preferences, endDate: e.target.value })
            }
            className="rounded-lg border-gray-300 focus:border-travel-primary focus:ring-2 focus:ring-travel-primary/30 transition"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget</Label>
          <Input
            id="budget"
            required
            value={preferences.budget}
            onChange={(e) =>
              setPreferences({ ...preferences, budget: e.target.value })
            }
            placeholder="e.g., $5000"
            className="rounded-lg border-gray-300 focus:border-travel-primary focus:ring-2 focus:ring-travel-primary/30 transition"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelers">Number of Travelers</Label>
          <Input
            id="travelers"
            type="number"
            min="1"
            required
            value={preferences.travelers}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                travelers: parseInt(e.target.value),
              })
            }
            className="rounded-lg border-gray-300 focus:border-travel-primary focus:ring-2 focus:ring-travel-primary/30 transition"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="interests">Interests & Preferences</Label>
        <Textarea
          id="interests"
          required
          value={preferences.interests}
          onChange={(e) =>
            setPreferences({ ...preferences, interests: e.target.value })
          }
          placeholder="e.g., historical sites, local cuisine, outdoor activities"
          className="h-24 rounded-lg border-gray-300 focus:border-travel-primary focus:ring-2 focus:ring-travel-primary/30 transition"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="includeTransportation"
          checked={preferences.includeTransportation}
          onCheckedChange={(checked) =>
            setPreferences({
              ...preferences,
              includeTransportation: checked as boolean,
            })
          }
        />
        <Label
          htmlFor="includeTransportation"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Include transportation details
        </Label>
      </div>
      <Button
        type="submit"
        className="w-full py-3 text-lg rounded-lg bg-travel-primary hover:bg-travel-primary/90 transition-all shadow-md"
        disabled={isLoading}
      >
        {isLoading ? "Generating Plan..." : "Plan My Trip"}
      </Button>
    </form>
  );
}