# 🌤️ Weather App Frontend

A modern, responsive React frontend for the Weather Application that provides real-time weather information and 5-day forecasts for any city worldwide.

## 🌟 What This Website Does

This is a beautiful, interactive weather application that allows users to:

- **Search Weather**: Enter any city name to get current weather conditions
- **View Detailed Information**: See temperature, humidity, wind speed, pressure, and visibility
- **Temperature Conversion**: Toggle between Celsius and Fahrenheit instantly
- **5-Day Forecast**: Get extended weather forecasts with daily min/max temperatures
- **Smart Caching**: Experience fast loading with intelligent data caching
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Backgrounds**: Background changes based on weather conditions
- **Modern UI**: Glassmorphism design with smooth animations and transitions

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **Axios**: HTTP client for API communication
- **CSS3**: Advanced styling with glassmorphism effects
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Modern Animations**: Smooth transitions and hover effects

## 🌐 Data Source

This application uses the **OpenWeather API** to fetch real-time weather data:
- **Current Weather**: Temperature, conditions, humidity, wind, pressure, visibility
- **5-Day Forecast**: Extended weather predictions with daily forecasts
- **Weather Icons**: Official OpenWeather icons for visual representation
- **Global Coverage**: Weather data for cities worldwide

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd weather-app/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```
   
   **Note**: Update the API URL to match your backend server address.

4. **Start Development Server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open in Browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually navigate to the URL

## 🎨 Features

### 🌡️ Temperature Management
- **Real-time Conversion**: Switch between °C and °F without API calls
- **Visual Toggle**: Beautiful button with custom tooltip
- **Consistent Display**: All temperatures update instantly

### 📊 Weather Details
- **Current Conditions**: Real-time weather information
- **Additional Metrics**: Humidity, wind speed, pressure, visibility
- **Visual Icons**: Weather condition icons from OpenWeather
- **Cache Indicators**: Shows when data is cached for faster loading

### 📅 5-Day Forecast
- **Daily Forecasts**: Extended weather predictions
- **Min/Max Temperatures**: Daily temperature ranges
- **Weather Conditions**: Expected weather for each day
- **Responsive Cards**: Beautiful forecast cards that adapt to screen size

### 🎭 Dynamic UI
- **Weather-Based Backgrounds**: Background changes based on weather conditions
- **Glassmorphism Design**: Modern frosted glass effects
- **Smooth Animations**: Delightful micro-interactions
- **Responsive Layout**: Perfect on all device sizes

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-optimized interface
- **Mobile**: Streamlined mobile experience with touch-friendly controls

## 🔧 Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects from Create React App (one-way operation)

### Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── WeatherCard.js   # Main weather display component
│   │   └── ForecastCard.js  # 5-day forecast component
│   ├── App.js              # Main application component
│   ├── App.css             # Main stylesheet
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🌐 API Integration

The frontend communicates with the backend API to:
- Fetch current weather data
- Retrieve 5-day forecasts
- Handle error responses gracefully
- Display loading states during API calls

### API Endpoints Used
- `GET /api/weather/:city` - Fetch weather data for a specific city
- `GET /api/health` - Health check endpoint

## 🎨 Styling Features

- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Dynamic Backgrounds**: Weather-based gradient backgrounds
- **Smooth Animations**: CSS transitions and keyframe animations
- **Modern Typography**: Clean, readable fonts
- **Color Harmony**: Consistent color palette throughout



## 🔗 Backend Dependency

This frontend requires the Weather App Backend to be running. Make sure to:
1. Start the backend server (usually on port 8080)
2. Update `REACT_APP_API_URL` in your `.env` file to match the backend URL


**Built with ❤️ using React and modern web technologies**
