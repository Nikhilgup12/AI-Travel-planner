import ReactMarkdown from "react-markdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Chat } from "./Chat";

interface TravelItineraryProps {
  itinerary: string;
}

// Improved helper to extract sections from the AI output, ignoring numbering and allowing for variations
function extractSection(text: string, title: string) {
  // Remove numbering and match section headers loosely
  const regex = new RegExp(`[\n\r]+(?:\d+\.\s*)?${title.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/\s+/g, "\\s*")}[\s:]*([\s\S]*?)(?=[\n\r]+(?:\d+\.\s*)?[A-Z][^:]+[\s:]*|$)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

// Helper to auto-link URLs and known travel sites
function autoLink(text: string) {
  // Link URLs
  let linked = text.replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>');
  // Link IRCTC
  linked = linked.replace(/IRCTC website/gi, '<a href="https://www.irctc.co.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">IRCTC website</a>');
  // Link Sula Vineyards
  linked = linked.replace(/Sula Vineyards/gi, '<a href="https://sulavineyards.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">Sula Vineyards</a>');
  return linked;
}

// Helper to highlight costs and locations
function highlightInfo(text: string) {
  // Highlight costs (₹ or $ amounts)
  let highlighted = text.replace(/([₹$]\d+[\d,\-]*)/g, '<span class="bg-green-100 text-green-800 font-semibold rounded px-1">$1</span>');
  // Highlight hotel names (simple heuristic)
  highlighted = highlighted.replace(/Hotel [A-Za-z ]+/g, '<span class="bg-yellow-100 text-yellow-800 font-semibold rounded px-1">$&</span>');
  // Highlight meal keywords
  highlighted = highlighted.replace(/(breakfast|lunch|dinner|snack|wine tasting)/gi, '<span class="bg-pink-100 text-pink-800 font-semibold rounded px-1">$1</span>');
  return highlighted;
}

// Helper to pick icon for activity type
function activityIcon(desc: string) {
  if (/breakfast|lunch|dinner|snack|restaurant|cuisine|food/i.test(desc)) return <span title="Meal">🍽️</span>;
  if (/depart|arrive|bus|train|flight|airport|transport|rickshaw|taxi|travel/i.test(desc)) return <span title="Travel">🚌</span>;
  if (/hotel|check in|check out|accommodation/i.test(desc)) return <span title="Hotel">🏨</span>;
  if (/market|shopping|bazaar/i.test(desc)) return <span title="Shopping">🛍️</span>;
  if (/sightseeing|explore|visit|tour|museum|temple|river|vineyard|winery/i.test(desc)) return <span title="Sightseeing">📸</span>;
  if (/relax|freshen up|stroll|rest/i.test(desc)) return <span title="Relax">🛌</span>;
  return <span title="Activity">🗺️</span>;
}

export function TravelItinerary({ itinerary }: TravelItineraryProps) {
  if (!itinerary) return null;

  // Split the itinerary into main content and flights section
  const [mainContent, flightsSection] = itinerary.split("## Available Flights");

  // Parse main sections
  const dailyItinerary = extractSection(mainContent, "Daily Itinerary with Timings");
  const estimatedCosts = extractSection(mainContent, "Estimated Costs");
  const accommodations = extractSection(mainContent, "Recommended Accommodations");
  const tips = extractSection(mainContent, "Travel Tips and Recommendations");
  const mustVisit = extractSection(mainContent, "Must-Visit Places");
  const transportation = extractSection(mainContent, "Transportation Options and Recommendations");

  // If all sections are empty, fallback to showing the full mainContent
  const noSections = !dailyItinerary && !estimatedCosts && !accommodations && !tips && !mustVisit && !transportation;

  // Parse flight data from markdown if available
  const flightData = flightsSection?.match(/Option \d+[\s\S]*?(?=Option|\Z)/g) || [];

  return (
    <div className="mt-8 space-y-8 animate-fade-in">
      <div className="space-y-8">
        {/* Title Card */}
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2 items-start">
          <h2 className="text-2xl md:text-3xl font-extrabold text-travel-primary flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#2D9CDB"/></svg>
            Your Travel Itinerary
          </h2>
          <div className="text-lg font-semibold text-gray-700">
            {mainContent.split("\n")[0]}
          </div>
          <div className="text-gray-500 text-base">
            {mainContent.split("\n")[1]}
          </div>
        </div>

        {/* Fallback: Show all content if parsing fails */}
        {noSections && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <ReactMarkdown className="prose max-w-none text-gray-800">{mainContent}</ReactMarkdown>
          </div>
        )}

        {/* Daily Itinerary Timeline */}
        {dailyItinerary && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-travel-primary flex items-center gap-2 mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="#2D9CDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#2D9CDB" strokeWidth="2"/></svg>
              Daily Itinerary
            </h3>
            <ReactMarkdown className="prose max-w-none text-gray-800">{dailyItinerary}</ReactMarkdown>
          </div>
        )}

        {/* Estimated Costs */}
        {estimatedCosts && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-travel-primary flex items-center gap-2 mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 1v22M5 5h14M5 19h14" stroke="#2D9CDB" strokeWidth="2" strokeLinecap="round"/></svg>
              Estimated Costs
            </h3>
            <ReactMarkdown className="prose max-w-none text-gray-800">{estimatedCosts}</ReactMarkdown>
          </div>
        )}

        {/* Accommodations */}
        {accommodations && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-travel-primary flex items-center gap-2 mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 10v10h18V10M4 10V7a8 8 0 0116 0v3" stroke="#2D9CDB" strokeWidth="2" strokeLinecap="round"/></svg>
              Recommended Accommodations
            </h3>
            <ReactMarkdown className="prose max-w-none text-gray-800">{accommodations}</ReactMarkdown>
          </div>
        )}

        {/* Travel Tips */}
        {tips && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-travel-primary flex items-center gap-2 mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#2D9CDB"/></svg>
              Travel Tips & Recommendations
            </h3>
            <ReactMarkdown className="prose max-w-none text-gray-800">{tips}</ReactMarkdown>
          </div>
        )}

        {/* Must-Visit Places */}
        {mustVisit && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-travel-primary flex items-center gap-2 mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#2D9CDB"/></svg>
              Must-Visit Places
            </h3>
            <ReactMarkdown className="prose max-w-none text-gray-800">{mustVisit}</ReactMarkdown>
          </div>
        )}

        {/* Transportation */}
        {transportation && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-travel-primary flex items-center gap-2 mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 17V7a5 5 0 0110 0v10" stroke="#2D9CDB" strokeWidth="2"/></svg>
              Transportation Options
            </h3>
            <ReactMarkdown className="prose max-w-none text-gray-800">{transportation}</ReactMarkdown>
          </div>
        )}

        {/* Flights Section (if present) */}
        {flightsSection && (
          <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-travel-primary flex items-center gap-2 mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M2.5 19.5l19-7-7 19-2-8-8-2z" stroke="#2D9CDB" strokeWidth="2"/></svg>
              Available Flights
            </h3>
            <div className="overflow-x-auto">
              <Table className="min-w-full text-sm border rounded-lg">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Airline</TableHead>
                    <TableHead>Flight No.</TableHead>
                    <TableHead>Booking</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flightData.map((flight, index) => {
                    const price = flight.match(/Price: \$(\d+)/)?.[1] || "-";
                    const duration = flight.match(/Duration: (\d+)/)?.[1] || "-";
                    const airline = flight.match(/Airline: ([^\n]+)/)?.[1] || "-";
                    const flightNumber = flight.match(/Flight Number: ([^\n]+)/)?.[1] || "-";
                    const bookingToken = flight.match(/booking_token: ([^\n]+)/)?.[1] || "";

                    return (
                      <TableRow key={index} className="hover:bg-travel-accent/10 transition">
                        <TableCell className="font-semibold">{index + 1}</TableCell>
                        <TableCell className="text-green-700 font-bold">${price}</TableCell>
                        <TableCell>{duration} mins</TableCell>
                        <TableCell>{airline}</TableCell>
                        <TableCell>{flightNumber}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            className="text-travel-primary hover:text-travel-primary/80 border-travel-primary"
                            onClick={() => {
                              window.open(
                                `https://www.google.com/flights/booking?token=${bookingToken}`,
                                "_blank"
                              );
                            }}
                          >
                            Book Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
      <Chat itinerary={itinerary} />
    </div>
  );
}