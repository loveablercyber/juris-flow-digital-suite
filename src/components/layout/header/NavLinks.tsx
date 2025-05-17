
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

interface NavLinksProps {
  links: Array<{
    name: string;
    path: string;
    icon?: React.ReactNode;
  }>;
  closeMobileMenu?: () => void;
}

const NavLinks = ({ links, closeMobileMenu }: NavLinksProps) => {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="font-medium py-2 hover:text-primary transition-colors flex items-center"
          onClick={closeMobileMenu}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
