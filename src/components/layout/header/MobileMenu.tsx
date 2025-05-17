import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, ScrollText, BookMarked, Mail, Video, Briefcase } from "lucide-react";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  language: "pt" | "en";
  navLinks: Array<{
    name: string;
    path: string;
    icon?: React.ReactNode;
  }>;
  toggleLanguage: (lang: "pt" | "en") => void;
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileMenu = ({
  mobileMenuOpen,
  language,
  navLinks,
  toggleLanguage,
  setMobileMenuOpen,
}: MobileMenuProps) => {
  if (!mobileMenuOpen) return null;

  const resourcesLinks = [
    { name: "FAQ", path: "/wiki-faq", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { name: "Checklists", path: "/checklists", icon: <ScrollText className="mr-2 h-4 w-4" /> },
    { name: "E-books", path: "/ebooks", icon: <BookMarked className="mr-2 h-4 w-4" /> },
    { name: "Newsletter", path: "/newsletter", icon: <Mail className="mr-2 h-4 w-4" /> },
    { name: "Webinars", path: "/webinars", icon: <Video className="mr-2 h-4 w-4" /> },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm shadow-md py-4 px-6 animate-fade-in">
      <nav className="flex flex-col gap-4">
        <NavLinks links={navLinks} closeMobileMenu={closeMobileMenu} />
        
        {/* Resources Section */}
        <div className="py-4 border-t border-border">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {language === "pt" ? "Recursos" : "Resources"}
          </div>
          <NavLinks links={resourcesLinks} closeMobileMenu={closeMobileMenu} />
        </div>

        <div className="flex items-center gap-4 py-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => toggleLanguage("pt")}
          >
            🇧🇷 PT
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => toggleLanguage("en")}
          >
            🇺🇸 EN
          </Button>
        </div>
        <Button variant="default" asChild className="bg-navy-500 hover:bg-navy-600 mt-2">
          <Link to="/login" onClick={closeMobileMenu}>
            {language === "pt" ? "Área do Cliente" : "Client Portal"}
          </Link>
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;
