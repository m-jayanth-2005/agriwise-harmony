import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, CloudRain, Cloud, Wind, Droplets, ThermometerSun, Search, MapPin, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock weather data
const mockWeatherData = {
  current: {
    location: "San Francisco, CA",
    temp: 72,
    feelsLike: 70,
    humidity: 65,
    windSpeed: 8,
    windDirection: "SW",
    pressure: 1012,
    visibility: 10,
    sunrise: "06:45 AM",
    sunset: "07:30 PM",
    condition: "Partly Cloudy",
    icon: "cloud",
    uv: "Moderate",
    precipProbability: 20,
  },
  hourly: [
    { time: "Now", temp: 72, icon: "cloud", precipProbability: 20 },
    { time: "1 PM", temp: 73, icon: "sun", precipProbability: 10 },
    { time: "2 PM", temp: 74, icon: "sun", precipProbability: 10 },
    { time: "3 PM", temp: 75, icon: "sun", precipProbability: 5 },
    { time: "4 PM", temp: 74, icon: "cloud", precipProbability: 15 },
    { time: "5 PM", temp: 72, icon: "cloud", precipProbability: 25 },
    { time: "6 PM", temp: 70, icon: "cloud", precipProbability: 30 },
    { time: "7 PM", temp: 68, icon: "cloud", precipProbability: 35 },
    { time: "8 PM", temp: 67, icon: "cloud", precipProbability: 40 },
    { time: "9 PM", temp: 65, icon: "cloud-rain", precipProbability: 45 },
    { time: "10 PM", temp: 64, icon: "cloud-rain", precipProbability: 60 },
    { time: "11 PM", temp: 63, icon: "cloud-rain", precipProbability: 70 },
  ],
  daily: [
    { day: "Today", high: 75, low: 63, icon: "cloud", precipProbability: 40 },
    { day: "Tue", high: 78, low: 65, icon: "sun", precipProbability: 10 },
    { day: "Wed", high: 80, low: 67, icon: "sun", precipProbability: 5 },
    { day: "Thu", high: 77, low: 66, icon: "cloud", precipProbability: 20 },
    { day: "Fri", high: 72, low: 65, icon: "cloud-rain", precipProbability: 70 },
    { day: "Sat", high: 68, low: 60, icon: "cloud-rain", precipProbability: 80 },
    { day: "Sun", high: 71, low: 62, icon: "cloud", precipProbability: 30 },
  ],
  alerts: [
    {
      title: "Heavy Rain Alert",
      description: "Potential for localized flooding in low-lying areas.",
      time: "Friday, 12:00 PM - Saturday, 6:00 PM",
      severity: "Moderate",
    },
  ],
  farmingTips: [
    "Based on the upcoming weather pattern, consider harvesting sensitive crops before Friday's rain.",
    "The warm temperatures on Tuesday and Wednesday are ideal for outdoor planting activities.",
    "With high humidity levels, monitor for fungal diseases in susceptible crops.",
    "Consider covering frost-sensitive plants on Saturday night as temperatures may drop.",
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

const Weather = () => {
  const [location, setLocation] = useState("San Francisco, CA");
  const [weather, setWeather] = useState(mockWeatherData);

  const handleLocationSearch = () => {
    // In a real app, this would fetch weather data for the new location
    console.log("Searching for weather in:", location);
    // For demo purposes, we'll just keep using the mock data
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got coordinates:", position.coords.latitude, position.coords.longitude);
          // In a real app, we would reverse geocode these coordinates and fetch weather data
          setLocation("Current Location");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="ag-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Weather Forecast</h1>
            <p className="text-muted-foreground max-w-2xl">
              Get real-time weather updates and forecasts tailored for farming activities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleLocationSearch} className="bg-weather-dark hover:bg-weather-darker text-white">
              Search
            </Button>
            <Button variant="outline" onClick={handleUseCurrentLocation} className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Use My Location
            </Button>
          </div>

          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="grid w-full md:w-[400px] grid-cols-3">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">7-Day</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>Current Weather</span>
                      <span className="text-lg font-normal">{weather.current.location}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                      <div className="flex items-center gap-4">
                        {getWeatherIcon(weather.current.icon, 64)}
                        <div>
                          <div className="text-5xl font-bold">{weather.current.temp}°F</div>
                          <div className="text-muted-foreground">{weather.current.condition}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Feels like {weather.current.feelsLike}°F
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <Droplets className="h-4 w-4 text-blue-400 mr-2" />
                          <span>{weather.current.humidity}% Humidity</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{weather.current.windSpeed} mph {weather.current.windDirection}</span>
                        </div>
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 text-orange-400 mr-2" />
                          <span>UV: {weather.current.uv}</span>
                        </div>
                        <div className="flex items-center">
                          <CloudRain className="h-4 w-4 text-blue-400 mr-2" />
                          <span>{weather.current.precipProbability}% Chance of Rain</span>
                        </div>
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 text-yellow-500 mr-2" />
                          <span>Sunrise: {weather.current.sunrise}</span>
                        </div>
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 text-amber-500 mr-2" />
                          <span>Sunset: {weather.current.sunset}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t pt-4">
                      <h3 className="font-medium mb-3">Today's Forecast</h3>
                      <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                        {weather.hourly.slice(0, 12).map((hour, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <span className="text-xs font-medium">{hour.time}</span>
                            {getWeatherIcon(hour.icon, 20)}
                            <span className="text-sm mt-1">{hour.temp}°</span>
                            <span className="text-xs text-muted-foreground">{hour.precipProbability}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Farming Insights</CardTitle>
                    <CardDescription>
                      Weather-based recommendations for your farm
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weather.farmingTips.map((tip, i) => (
                        <div key={i} className="flex gap-2 pb-3 border-b last:border-b-0 last:pb-0">
                          <div className="mt-1 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-weather-dark">
                              <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                          </div>
                          <p className="text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {weather.alerts.length > 0 && (
                <Card className="mt-6 border-amber-300">
                  <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <CardTitle>Weather Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weather.alerts.map((alert, i) => (
                        <div key={i} className="bg-amber-50 border border-amber-200 rounded-md p-4">
                          <h3 className="font-medium text-amber-800 mb-1">{alert.title}</h3>
                          <p className="text-sm text-amber-700 mb-2">{alert.description}</p>
                          <div className="flex justify-between text-xs text-amber-600">
                            <span>Time: {alert.time}</span>
                            <span>Severity: {alert.severity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="hourly">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Forecast</CardTitle>
                  <CardDescription>
                    Detailed weather forecast for the next 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Time
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Condition
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Temp
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Precip
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {weather.hourly.concat(weather.hourly).slice(0, 24).map((hour, i) => (
                              <tr key={i} className="hover:bg-muted/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  {hour.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    {getWeatherIcon(hour.icon, 24)}
                                    <span className="ml-2 text-sm">
                                      {hour.icon === "sun" ? "Sunny" : hour.icon === "cloud" ? "Cloudy" : "Rainy"}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  {hour.temp}°F
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  {hour.precipProbability}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>7-Day Forecast</CardTitle>
                  <CardDescription>
                    Extended weather forecast for the next week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weather.daily.map((day, i) => (
                      <Card key={i} className="bg-muted/30 border-none">
                        <CardContent className="p-4 text-center">
                          <h3 className="font-medium">{day.day}</h3>
                          <div className="flex justify-center my-3">
                            {getWeatherIcon(day.icon, 36)}
                          </div>
                          <div className="flex justify-center items-center gap-2 text-sm">
                            <span className="font-medium">{day.high}°</span>
                            <span className="text-muted-foreground">{day.low}°</span>
                          </div>
                          <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <CloudRain className="h-3 w-3" />
                            <span>{day.precipProbability}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Weather;
