
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    toast({
      title: language === "pt" ? "Tema alterado" : "Theme changed",
      description: language === "pt" 
        ? `Modo ${newMode ? "escuro" : "claro"} ativado.` 
        : `${newMode ? "Dark" : "Light"} mode activated.`,
      duration: 2000,
    });
  };

  const toggleLanguage = (lang: "pt" | "en") => {
    setLanguage(lang);
    toast({
      title: lang === "pt" ? "Idioma alterado" : "Language changed",
      description: lang === "pt" ? "Português ativado." : "English activated.",
      duration: 2000,
    });
  };

  const navLinks = [
    { name: language === "pt" ? "Home" : "Home", path: "/" },
    { name: language === "pt" ? "Quem Somos" : "About Us", path: "/quem-somos" },
    { name: language === "pt" ? "Áreas de Atuação" : "Practice Areas", path: "/areas-de-atuacao" },
    { name: language === "pt" ? "Blog" : "Blog", path: "/blog" },
    { name: language === "pt" ? "Atendimento" : "Contact", path: "/atendimento" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-playfair font-bold text-2xl text-navy-500 dark:text-white">
            ADVOCACIA<span className="text-gold-500">LEX</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toggleLanguage("pt")}>
                🇧🇷 Português
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleLanguage("en")}>
                🇺🇸 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="default" asChild className="bg-navy-500 hover:bg-navy-600">
            <Link to="/portal">
              {language === "pt" ? "Área do Cliente" : "Client Portal"}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm shadow-md py-4 px-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
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
              <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                {language === "pt" ? "Área do Cliente" : "Client Portal"}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
