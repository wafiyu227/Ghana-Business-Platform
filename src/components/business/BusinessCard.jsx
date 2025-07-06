import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, User, ExternalLink, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useBusiness } from '../../../context/BusinessContext'; // Update this path to match your project structure
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BusinessCard = ({ 
  business = null, // For when business data is passed as prop
  onProfileClick = null,
  showProfileButton = true,
  className = "" 
}) => {
  const { businessData: contextBusinessData, loading, error } = useBusiness();
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Use passed business prop or fallback to context data
  const businessData = business || contextBusinessData;

  // Loading state (only show loading if no business prop is passed and context is loading)
  if (!business && loading) {
    return (
      <div className={`max-w-sm mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state (only show error if no business prop is passed and context has error)
  if (!business && error) {
    return (
      <div className={`max-w-sm mx-auto bg-white rounded-2xl shadow-lg border border-red-200 p-6 ${className}`}>
        <div className="text-center text-red-600">
          <p className="font-medium">Error loading business data</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!businessData) {
    return (
      <div className={`max-w-sm mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center text-gray-600">
          <p>No business data available</p>
        </div>
      </div>
    );
  }

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentDay = currentTime.getDay();
  
  // Simple open/closed logic based on operating hours
  const isCurrentlyOpen = (() => {
    if (!businessData.operatingHours) return false;
    
    const hours = businessData.operatingHours.toLowerCase();
    if (hours.includes('daily') || hours.includes('everyday')) {
      return currentHour >= 8 && currentHour < 18;
    }
    if (hours.includes('mon-sat') || hours.includes('monday-saturday')) {
      return currentDay >= 1 && currentDay <= 6 && currentHour >= 8 && currentHour < 18;
    }
    if (hours.includes('mon-fri') || hours.includes('monday-friday')) {
      return currentDay >= 1 && currentDay <= 5 && currentHour >= 8 && currentHour < 17;
    }
    return false;
  })();

  const handleWhatsAppClick = () => {
    const number = businessData.contact;
    if (number) {
      window.open(`https://wa.me/${number.replace(/\D/g, '')}`, '_blank');
    }
  };

  const handleCallClick = () => {
    if (businessData.contact) {
      window.location.href = `tel:${businessData.contact}`;
    }
  };

  const handleEmailClick = () => {
    if (businessData.email) {
      window.location.href = `mailto:${businessData.email}`;
    }
  };

  const handleProfileClick = () => {
    navigate(`/business/${business.id}`);
  };

  const location = [businessData.town, businessData.region].filter(Boolean).join(', ');

  return (
    <div className={`max-w-sm mx-auto bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 ${className}`}>
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-green-50 to-blue-50 p-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-sm">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
              {businessData.businessName}
            </h2>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-4">
        {/* Physical Address */}
        {businessData.physicalAddress && (
          <div className="mb-4">
            <div className="flex items-start text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{businessData.physicalAddress}</span>
            </div>
          </div>
        )}

        {/* Operating Hours */}
        {businessData.operatingHours && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{businessData.operatingHours}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                isCurrentlyOpen 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isCurrentlyOpen ? 'Open Now' : 'Closed Now'}
              </span>
            </div>
          </div>
        )}

        {/* Employee Count */}
        {businessData.employeeCount && (
          <div className="mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <User className="w-4 h-4 mr-2" />
              <span>{businessData.employeeCount} employees</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Contact Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {businessData.contact && (
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
            )}
            
            {businessData.contact && (
              <button
                onClick={handleCallClick}
                className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Phone className="w-5 h-5" />
                <span>Call</span>
              </button>
            )}
          </div>

          {/* Email Button */}
          {businessData.email && (
            <button
              onClick={handleEmailClick}
              className="w-full flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
          )}

          {/* Social Media Links */}
          {businessData.social && (businessData.social.facebook || businessData.social.instagram || businessData.social.twitter || businessData.social.linkedin) && (
            <div className="flex justify-center space-x-4 pt-2">
              {businessData.social.facebook && (
                <a
                  href={`https://facebook.com/${businessData.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {businessData.social.instagram && (
                <a
                  href={`https://instagram.com/${businessData.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {businessData.social.twitter && (
                <a
                  href={`https://twitter.com/${businessData.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {businessData.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${businessData.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          {/* View Profile Button */}
        
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Full Profile</span>
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;