
import { Link } from "react-router-dom";
import { BookOpen, ScrollText, BookMarked, Mail, Video } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResourcesDropdownProps {
  language: "pt" | "en";
}

const ResourcesDropdown = ({ language }: ResourcesDropdownProps) => {
  const resourcesLinks = [
    { name: "FAQ", path: "/wiki-faq", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { name: "Checklists", path: "/checklists", icon: <ScrollText className="mr-2 h-4 w-4" /> },
    { name: "E-books", path: "/ebooks", icon: <BookMarked className="mr-2 h-4 w-4" /> },
    { name: "Newsletter", path: "/newsletter", icon: <Mail className="mr-2 h-4 w-4" /> },
    { name: "Webinars", path: "/webinars", icon: <Video className="mr-2 h-4 w-4" /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-medium hover:text-primary transition-colors">
        {language === "pt" ? "Recursos" : "Resources"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          {language === "pt" ? "Recursos Disponíveis" : "Available Resources"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {resourcesLinks.map((resource) => (
          <DropdownMenuItem key={resource.path} asChild>
            <Link to={resource.path} className="flex items-center">
              {resource.icon}
              {resource.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResourcesDropdown;
