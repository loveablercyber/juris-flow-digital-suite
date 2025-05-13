
import React, { ReactNode } from "react";

interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const ValueCard = ({ title, description, icon }: ValueCardProps) => {
  return (
    <div className="bg-white dark:bg-navy-700 p-6 rounded-xl shadow-md">
      <div className="text-navy-500 dark:text-gold-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
