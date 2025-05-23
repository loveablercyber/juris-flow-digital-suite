import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import HeaderContainer from "./header/HeaderContainer";
import ThemeToggle from "./header/ThemeToggle";
import LanguageSelector from "./header/LanguageSelector";
import MobileMenuButton from "./header/MobileMenuButton";
import MobileMenu from "./header/MobileMenu";
import DesktopNavigation from "./header/DesktopNavigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleLanguage = (lang: "pt" | "en") => {
    setLanguage(lang);
  };

  const navLinks = [
    { name: language === "pt" ? "Home" : "Home", path: "/" },
    { name: language === "pt" ? "Quem Somos" : "About Us", path: "/quem-somos" },
    { name: language === "pt" ? "Áreas de Atuação" : "Practice Areas", path: "/areas-de-atuacao" },
    { 
      name: language === "pt" ? "Processos" : "Cases", 
      path: "/advogado/processos", 
      icon: <Briefcase className="mr-2 h-4 w-4" /> 
    },
    { name: language === "pt" ? "Blog" : "Blog", path: "/blog" },
    { name: language === "pt" ? "Atendimento" : "Contact", path: "/atendimento" },
  ];

  return (
    <HeaderContainer scrolled={scrolled}>
      <Link to="/" className="flex items-center gap-2">
        <div className="font-playfair font-bold text-2xl text-navy-500 dark:text-white">
          ADVOCACIA<span className="text-gold-500">LEX</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <DesktopNavigation navLinks={navLinks} language={language} />

      <div className="hidden lg:flex items-center gap-4">
        <LanguageSelector language={language} toggleLanguage={toggleLanguage} />
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} language={language} />
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} language={language} />
        <MobileMenuButton mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        language={language}
        navLinks={navLinks}
        toggleLanguage={toggleLanguage}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </HeaderContainer>
  );
};

export default Header;
