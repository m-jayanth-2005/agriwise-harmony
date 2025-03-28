import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Leaf, CloudRain, Sprout, Bug, MessageSquare, BarChart, ArrowUp, ArrowDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedCard from "@/components/dashboard/FeaturedCard";
import WeatherWidget from "@/components/dashboard/WeatherWidget";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="ag-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Farming Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's an overview of your farm's status</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/profile">View Profile</Link>
              </Button>
              <Button asChild className="bg-soil-dark hover:bg-soil-darker text-white">
                <Link to="/soil-analysis">New Analysis</Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sprout className="h-5 w-5" />
                      Soil Health Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">Good</p>
                        <p className="text-muted-foreground text-sm">Last updated: 2 days ago</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm font-medium">12%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/soil-analysis">View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      Crop Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">Healthy</p>
                        <p className="text-muted-foreground text-sm">3 potential issues found</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                        <ArrowDown className="h-4 w-4" />
                        <span className="text-sm font-medium">3%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/disease-detection">Check Plants</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Yield Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">+15%</p>
                        <p className="text-muted-foreground text-sm">Compared to last season</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm font-medium">8%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Predictions</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <WeatherWidget />

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Community Activity</CardTitle>
                    <CardDescription>Latest discussions and questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b pb-3 last:border-b-0 last:pb-0">
                        <h4 className="font-medium">How to manage tomato leaf curl virus?</h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          I've noticed some curling on my tomato plants and suspect it might be a virus...
                        </p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Posted by: John Farmer</span>
                          <span>5 responses</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/community">View Community</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Quick Access</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <FeaturedCard
                    title="Soil Analysis"
                    description="Check your soil health and get recommendations"
                    icon={<Sprout className="h-5 w-5 text-soil-dark" />}
                    linkTo="/soil-analysis"
                    bgColor="hover:bg-soil-light/30"
                  />
                  <FeaturedCard
                    title="Disease Detection"
                    description="Identify plant diseases from images"
                    icon={<Bug className="h-5 w-5 text-plant-dark" />}
                    linkTo="/disease-detection"
                    bgColor="hover:bg-plant-light/30"
                  />
                  <FeaturedCard
                    title="Weather Forecast"
                    description="Get detailed weather predictions"
                    icon={<CloudRain className="h-5 w-5 text-weather-dark" />}
                    linkTo="/weather"
                    bgColor="hover:bg-weather-light/30"
                  />
                  <FeaturedCard
                    title="Community"
                    description="Connect with other farmers and experts"
                    icon={<MessageSquare className="h-5 w-5 text-community-dark" />}
                    linkTo="/community"
                    bgColor="hover:bg-community-light/30"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Insights</CardTitle>
                    <CardDescription>
                      Personalized recommendations based on your farm data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-4 border-soil-dark pl-4 py-2">
                      <h3 className="font-medium">Soil Nutrient Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Your soil's potassium levels are slightly below optimal. Consider applying a potassium-rich fertilizer within the next 7-10 days for better crop development.
                      </p>
                    </div>
                    <div className="border-l-4 border-plant-dark pl-4 py-2">
                      <h3 className="font-medium">Pest Prevention Alert</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on current weather conditions and crop status, there's a moderate risk of aphid infestation in the next 2 weeks. Consider preventative measures.
                      </p>
                    </div>
                    <div className="border-l-4 border-weather-dark pl-4 py-2">
                      <h3 className="font-medium">Water Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Due to forecasted rainfall, you can reduce irrigation by 30% this week, saving approximately 2,000 gallons of water.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-soil-dark hover:bg-soil-darker text-white">
                      Generate New Insights
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activities">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>
                      Your recent actions and updates on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Soil Analysis",
                          description: "Performed soil health analysis for Field A",
                          date: "Yesterday at 2:30 PM",
                          icon: <Sprout className="h-5 w-5 text-soil-dark" />
                        },
                        {
                          action: "Disease Detection",
                          description: "Scanned tomato plants for potential diseases",
                          date: "2 days ago at 10:15 AM",
                          icon: <Bug className="h-5 w-5 text-plant-dark" />
                        },
                        {
                          action: "Community Post",
                          description: "Commented on 'Best practices for organic pest control'",
                          date: "3 days ago at 4:45 PM",
                          icon: <MessageSquare className="h-5 w-5 text-community-dark" />
                        },
                        {
                          action: "Weather Alert",
                          description: "Received frost warning for upcoming week",
                          date: "5 days ago at 9:00 AM",
                          icon: <CloudRain className="h-5 w-5 text-weather-dark" />
                        }
                      ].map((activity, i) => (
                        <div key={i} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="bg-muted rounded-full p-2">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{activity.action}</h4>
                              <span className="text-xs text-muted-foreground">{activity.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activities
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
