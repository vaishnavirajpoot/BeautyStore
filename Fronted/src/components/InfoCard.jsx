import React from "react";
import { Heart, Users, Building } from "lucide-react";

const icons = {
  team: <Users className="text-pink-400 bg-pink-100 p-2 rounded-full" size={28} />,
  heart: <Heart className="text-pink-400 bg-pink-100 p-2 rounded-full" size={28} />,
  facility: <Building className="text-pink-400 bg-pink-100 p-2 rounded-full" size={28} />,
};

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4 items-start p-5 rounded-xl bg-white shadow-md hover:shadow-pink-200 transition duration-300 border border-pink-100">
      <div>{icons[icon]}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
