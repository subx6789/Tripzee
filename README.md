# Tripzee

Tripzee is a dynamic web application built with React.js, Tailwind CSS, Firebase, Shadcn UI, and integrated with the Gemini API and Google APIs. This application offers users an intelligent way to plan their trips by leveraging AI technology. Users can log in with Google OAuth2, generate personalized trip plans by specifying their preferences, and explore detailed information about hotels and popular destinations.

## Features

- **Google OAuth2 Authentication:** Secure login and registration with Google.
- **AI Trip Generation:** Create customized trip plans based on location, number of days (1 to 6), budget, and number of travelers.
- **Destination Insights:** View suggested hotels and popular destinations along with recommended visit times.
- **Google Maps Integration:** Access Google Maps for detailed directions and location information.
- **Trip Management:** Save, view, and manage your AI-generated trips in the "My Trips" section. Option to delete trips as needed.
- **Share & Download:** Share your trip plans with others or download them in Excel format.
- **Account Management:** Log out and delete your account directly from the application.

## Getting Started

**To get a local copy up and running follow these simple steps.**

### Prerequisites

- Node.js and npm installed on your local machine.
- A Firebase project with and Firestore database.
- Google Cloud API keys for Google Maps and Google Photos.
I
### Installation

**Clone the repository:**

   ```bash
    git clone https://github.com/subx6789/Tripzee.git
   ``` 

**Navigate to the project directory:**

   ```bash
    cd ai-trip-planner
   ``` 

**Install dependencies:**

   ```bash
    npm install
   ``` 

**Create a `.env.local` file in the root directory and add your Firebase and Google API keys:**

   ```makefile
    VITE_GOOGLE_PLACE_API_KEY=your_google_place_api_key
    VITE_GOOGLE_GEMINI_AI_API_KEY=your_google_gemini_ai_api_key
    VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

**Start the development server:**

   ```bash
    npm run dev
   ``` 

## Usage

- **Login:** Use Google OAuth2 to authenticate and access the app.
- **Plan a Trip:** Enter your travel details and let the AI generate a trip plan for you.
- **Explore Destinations:** Click on hotels or destinations to view them on Google Maps.
- **Manage Trips:** View, delete, and share your saved trips from the "My Trips" section.
- **Account Settings:** Log out or delete your account from the account settings menu.

## Contributing

Feel free to open issues and submit pull requests if you have suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.