import React from "react";
import { FaHeart } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2 font-greatvibes">
          <div className="flex items-center gap-1 text-gray-500">
            <span>Con</span>
            <FaHeart size={16} className="text-red-600 fill-red-600" />
            <span className="text-xl"> en memoria de</span>
          </div>
          <p className="text-2xl text-gray-400">Felix Aranzadi Manterola</p>
        </div>
      </div>
    </footer>
  );
};
