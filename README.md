# AI Travel Planner

A modern, AI-powered travel itinerary generator built with React, TypeScript, Vite, shadcn-ui, and Tailwind CSS. This application leverages Google Gemini and SerpAPI to create personalized travel plans, including daily itineraries, cost estimates, accommodation suggestions, and real-time flight options.

---

## Features

- **AI-Generated Travel Itineraries**: Get detailed, day-by-day plans tailored to your preferences.
- **Flight Search Integration**: View real-time flight options and booking links.
- **Customizable Preferences**: Input source, destination, dates, budget, interests, and more.
- **Modern UI/UX**: Responsive, accessible, and visually appealing interface.
- **Chat Assistant**: Ask follow-up questions about your itinerary.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd travelogic-gemini-main
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   bun install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the project root:
     ```env
     VITE_GEMINI_API_KEY=your_google_generative_ai_key
     VITE_SERPAPI_API_KEY=your_serpapi_key
     ```
   - Replace with your actual API keys.

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   bun run dev
   ```
   The app will be available at `http://localhost:8080` (or as shown in your terminal).

---

## Project Structure

- `src/` — Main source code
  - `components/` — React components
  - `lib/` — API and utility logic
  - `pages/` — Page components
  - `hooks/` — Custom React hooks
- `public/` — Static assets
- `.env` — Environment variables (not committed)

---

## Deployment

You can deploy this app to any static hosting provider (e.g., Netlify, Vercel) or your own server. Build the app with:
```sh
npm run build
```
The output will be in the `dist/` folder.

---

## Technologies Used
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Generative AI (Gemini)](https://ai.google.dev/)
- [SerpAPI](https://serpapi.com/)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

---

## Contact

For questions or support, please open an issue in this repository.
