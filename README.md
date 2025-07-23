# AI Travel Planner

A modern, AI-powered travel itinerary generator with a beautiful, responsive, and engaging UI.  
Built with React, TypeScript, Vite, shadcn-ui, and Tailwind CSS.  
This app leverages Google Gemini and SerpAPI to create personalized travel plans, including daily timelines, cost breakdowns, accommodation suggestions, and real-time flight options.

🌐 **Live Demo:** [ai-travel-planner-sepia-gamma.vercel.app](https://ai-travel-planner-sepia-gamma.vercel.app/)

---

## ✨ Features

- **AI-Generated Travel Itineraries:** Get detailed, day-by-day plans tailored to your preferences.
- **Flight Search Integration:** View real-time flight options and booking links (via SerpAPI).
- **Customizable Preferences:** Input source, destination, dates, budget, interests, and more.
- **Modern, Responsive UI/UX:** Wide, colorful, and visually appealing layout across all devices.
- **Interactive Timeline:** Daily itinerary shown as a timeline with icons, highlights, and auto-linking.
- **Section Cards:** Costs, tips, must-visit places, and more, each in colorful, easy-to-read cards.
- **Chat Assistant:** Ask follow-up questions about your itinerary.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GIT_URL>
   cd travelogic-gemini-main
2 **Install dependencies:**


npm install
# or
bun install
3 **Set up environment variables:** 

Create a .env file in the project root:

VITE_GEMINI_API_KEY=your_google_generative_ai_key
VITE_SERPAPI_API_KEY=your_serpapi_key
Replace with your actual API keys.

4 **Start the development server:** 


npm run dev
# or
bun run dev
The app will be available at http://localhost:8080 (or as shown in your terminal).

🖼️ UI/UX Highlights
Wide, Responsive Layout: Stretches beautifully on desktop; remains clean on mobile/tablet.

Soft Pastel Backgrounds: Gradient of white, amber, and emerald for a fresh, modern feel.

Colorful Section Cards: Matching pastel backgrounds and harmonious text colors.

Engaging Timeline: Icons for meals, travel, sightseeing, and more.

Auto-Linking & Highlighting: Costs, hotels, and URLs are clickable and easy to explore.

Accessible & User-Friendly: High contrast, large touch targets, and keyboard navigation.

🏗️ Project Structure
src/ — Main source code

components/ — React components (form, itinerary, chat, UI)

lib/ — API integrations and utilities

pages/ — Page-level components

hooks/ — Custom React hooks

public/ — Static assets

.env — Environment variables (not committed to Git)

🌐 Deployment
To deploy to Vercel, Netlify, or similar:

Build the app:


npm run build
The production-ready files will be in the dist/ folder.

Important: Set your environment variables (e.g., VITE_GEMINI_API_KEY, VITE_SERPAPI_API_KEY) directly in the hosting platform’s dashboard instead of uploading your .env file.

🛠️ Technologies Used
React

TypeScript

Vite

shadcn/ui

Tailwind CSS

Google Generative AI (Gemini)

SerpAPI

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🤝 Contributing
Contributions are welcome!
Please open issues or pull requests to suggest improvements or report bugs.