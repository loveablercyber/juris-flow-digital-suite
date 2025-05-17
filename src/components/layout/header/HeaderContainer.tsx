
import { ReactNode } from "react";

interface HeaderContainerProps {
  scrolled: boolean;
  children: ReactNode;
}

const HeaderContainer = ({ scrolled, children }: HeaderContainerProps) => {
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {children}
      </div>
    </header>
  );
};

export default HeaderContainer;
