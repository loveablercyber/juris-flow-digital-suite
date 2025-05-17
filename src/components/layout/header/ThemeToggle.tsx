
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  language: "pt" | "en";
}

const ThemeToggle = ({ darkMode, setDarkMode, language }: ThemeToggleProps) => {
  const { toast } = useToast();
  
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

  return (
    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
      {darkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
