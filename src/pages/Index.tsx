
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, CloudRain, Sprout, Bug, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-soil-light to-white py-16 md:py-24">
          <div className="ag-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-soil-darker leading-tight">
                  AI-Powered Farming <br />
                  <span className="text-plant-darker">Solutions</span> for Modern Agriculture
                </h1>
                <p className="text-lg text-soil-dark max-w-lg">
                  Revolutionize your farming practices with data-driven insights, real-time disease detection, and personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-soil-dark hover:bg-soil-darker text-white">
                    <Link to="/dashboard">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/community">Join Community</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                    alt="Smart Farming"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-plant-light rounded-full opacity-70 z-0"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-community-light rounded-full opacity-70 z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="ag-container">
            <div className="text-center mb-12">
              <h2 className="ag-heading mb-4">Our AI-Powered Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Leverage cutting-edge technology to optimize your farming operations and increase yield while maintaining sustainability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="w-12 h-12 bg-soil-light rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-soil-darker" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Soil Health Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  AI-powered soil analysis for optimal nutrient balance and crop selection.
                </p>
                <Link to="/soil-analysis" className="text-soil-dark hover:text-soil-darker inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="w-12 h-12 bg-plant-light rounded-lg flex items-center justify-center mb-4">
                  <Bug className="h-6 w-6 text-plant-darker" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Disease Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Real-time plant disease identification using advanced computer vision.
                </p>
                <Link to="/disease-detection" className="text-plant-dark hover:text-plant-darker inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="w-12 h-12 bg-weather-light rounded-lg flex items-center justify-center mb-4">
                  <CloudRain className="h-6 w-6 text-weather-darker" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Insights</h3>
                <p className="text-muted-foreground mb-4">
                  Accurate weather forecasts and alerts customized for your farm location.
                </p>
                <Link to="/weather" className="text-weather-dark hover:text-weather-darker inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="w-12 h-12 bg-community-light rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-community-darker" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with experts and fellow farmers to share knowledge and get advice.
                </p>
                <Link to="/community" className="text-community-dark hover:text-community-darker inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="ag-container">
            <div className="text-center mb-12">
              <h2 className="ag-heading mb-4">How AgriWise Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform combines AI models, real-time data, and expert knowledge to provide actionable farming insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-soil-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-soil-darker">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Input Your Data</h3>
                <p className="text-muted-foreground">
                  Upload plant images or enter soil parameters to get started with analysis.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soil-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-soil-darker">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our advanced AI models process your data to generate accurate insights.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soil-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-soil-darker">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
                <p className="text-muted-foreground">
                  Receive personalized actionable recommendations to improve your farming outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-soil-darker text-white py-16">
          <div className="ag-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Farming?</h2>
              <p className="text-lg text-gray-300 mb-8">
                Join thousands of farmers who are already using AgriWise to increase productivity and sustainability.
              </p>
              <Button asChild size="lg" className="bg-soil-light hover:bg-soil text-soil-darker">
                <Link to="/dashboard">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
