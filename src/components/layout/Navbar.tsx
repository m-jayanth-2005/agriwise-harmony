
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // For demo purposes
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="ag-container py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-soil-dark" />
            <span className="text-xl font-bold text-soil-darker">AgriWise</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/dashboard" className="text-soil-dark hover:text-soil-darker">
            Dashboard
          </Link>
          <Link to="/soil-analysis" className="text-soil-dark hover:text-soil-darker">
            Soil Analysis
          </Link>
          <Link to="/disease-detection" className="text-soil-dark hover:text-soil-darker">
            Disease Detection
          </Link>
          <Link to="/weather" className="text-soil-dark hover:text-soil-darker">
            Weather
          </Link>
          <Link to="/community" className="text-soil-dark hover:text-soil-darker">
            Community
          </Link>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6 text-soil-dark" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleLogin}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={toggleLogin} variant="default" className="bg-soil-dark hover:bg-soil-darker text-white">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border py-4">
          <div className="ag-container flex flex-col space-y-4">
            <Link to="/dashboard" className="text-soil-dark hover:text-soil-darker" onClick={toggleMenu}>
              Dashboard
            </Link>
            <Link to="/soil-analysis" className="text-soil-dark hover:text-soil-darker" onClick={toggleMenu}>
              Soil Analysis
            </Link>
            <Link to="/disease-detection" className="text-soil-dark hover:text-soil-darker" onClick={toggleMenu}>
              Disease Detection
            </Link>
            <Link to="/weather" className="text-soil-dark hover:text-soil-darker" onClick={toggleMenu}>
              Weather
            </Link>
            <Link to="/community" className="text-soil-dark hover:text-soil-darker" onClick={toggleMenu}>
              Community
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-soil-dark hover:text-soil-darker" onClick={toggleMenu}>
                  Profile
                </Link>
                <Button onClick={() => { toggleLogin(); toggleMenu(); }} variant="outline" className="text-soil-dark">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => { toggleLogin(); toggleMenu(); }} variant="default" className="bg-soil-dark hover:bg-soil-darker text-white">
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
