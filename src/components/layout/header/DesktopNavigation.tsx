import { Link } from "react-router-dom";
import ResourcesDropdown from "./ResourcesDropdown";
import { Button } from "@/components/ui/button";

interface DesktopNavigationProps {
  navLinks: Array<{
    name: string;
    path: string;
    icon?: React.ReactNode;
  }>;
  language: "pt" | "en";
}

const DesktopNavigation = ({ navLinks, language }: DesktopNavigationProps) => {
  return (
    <div className="hidden lg:flex items-center">
      <nav className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-medium hover:text-primary transition-colors flex items-center"
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
        
        {/* Resources Dropdown */}
        <ResourcesDropdown language={language} />
      </nav>

      <div className="ml-8">
        <Button variant="default" asChild className="bg-navy-500 hover:bg-navy-600">
          <Link to="/login">
            {language === "pt" ? "Área do Cliente" : "Client Portal"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNavigation;
