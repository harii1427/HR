import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-blue-800 text-white py-2 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Coimbatore, Tamil Nadu, India</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <a href="mailto:connect@uniqhr.in" className="hover:underline">connect@uniqhr.in</a>
          </div>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          <span>9087017779 | 9087027779</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
