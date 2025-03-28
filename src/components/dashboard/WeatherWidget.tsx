
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Cloud, Wind, Droplets, ThermometerSun } from "lucide-react";
import { useState, useEffect } from "react";

// Mock weather data
const mockWeatherData = {
  location: "San Francisco, CA",
  current: {
    temp: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    icon: "cloud",
  },
  forecast: [
    { day: "Mon", temp: 70, icon: "sun" },
    { day: "Tue", temp: 68, icon: "cloud" },
    { day: "Wed", temp: 72, icon: "sun" },
    { day: "Thu", temp: 65, icon: "cloud-rain" },
    { day: "Fri", temp: 67, icon: "cloud" },
  ],
};

const getWeatherIcon = (icon: string, size = 24) => {
  switch (icon) {
    case "sun":
      return <Sun size={size} className="text-yellow-500" />;
    case "cloud":
      return <Cloud size={size} className="text-gray-400" />;
    case "cloud-rain":
      return <CloudRain size={size} className="text-blue-400" />;
    default:
      return <Cloud size={size} className="text-gray-400" />;
  }
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(mockWeatherData);
  
  // In a real app, you would fetch weather data here
  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     // Fetch data from weather API
  //     // setWeather(data);
  //   };
  //   fetchWeatherData();
  // }, []);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Weather Forecast</span>
          <span className="text-sm font-normal text-muted-foreground">{weather.location}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            {getWeatherIcon(weather.current.icon, 48)}
            <div className="ml-3">
              <div className="text-3xl font-bold">{weather.current.temp}°F</div>
              <div className="text-muted-foreground">{weather.current.condition}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center">
              <Droplets size={18} className="text-blue-400 mr-2" />
              <span className="text-sm">{weather.current.humidity}% Humidity</span>
            </div>
            <div className="flex items-center">
              <Wind size={18} className="text-gray-400 mr-2" />
              <span className="text-sm">{weather.current.windSpeed} mph Wind</span>
            </div>
            <div className="flex items-center">
              <ThermometerSun size={18} className="text-orange-400 mr-2" />
              <span className="text-sm">Feels like {weather.current.temp - 2}°F</span>
            </div>
            <div className="flex items-center">
              <Sun size={18} className="text-yellow-500 mr-2" />
              <span className="text-sm">UV Index: Moderate</span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <div className="text-sm font-medium mb-2">5-Day Forecast</div>
          <div className="grid grid-cols-5 gap-1">
            {weather.forecast.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-sm font-medium">{day.day}</span>
                {getWeatherIcon(day.icon, 24)}
                <span className="text-sm mt-1">{day.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
