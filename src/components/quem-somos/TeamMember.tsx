
import React from "react";

interface TeamMemberProps {
  name: string;
  position: string;
  area: string;
  bio: string;
  image: string;
}

const TeamMember = ({ name, position, area, bio, image }: TeamMemberProps) => {
  return (
    <div className="bg-white dark:bg-navy-700 rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-2 duration-300">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-navy-500 dark:text-gold-400 text-sm mb-1">{position}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{area}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {bio}
        </p>
      </div>
    </div>
  );
};

export default TeamMember;
