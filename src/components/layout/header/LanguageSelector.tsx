
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface LanguageSelectorProps {
  language: "pt" | "en";
  toggleLanguage: (lang: "pt" | "en") => void;
}

const LanguageSelector = ({ language, toggleLanguage }: LanguageSelectorProps) => {
  const { toast } = useToast();
  
  const handleLanguageChange = (lang: "pt" | "en") => {
    toggleLanguage(lang);
    toast({
      title: lang === "pt" ? "Idioma alterado" : "Language changed",
      description: lang === "pt" ? "Português ativado." : "English activated.",
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("pt")}>
          🇧🇷 Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
