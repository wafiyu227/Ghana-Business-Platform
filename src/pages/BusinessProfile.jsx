import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Users,
  Building,
  Globe,
  Calendar,
  Star,
  Share2,
  Heart,
  Camera,

  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const BusinessProfile = ({ 
  business = null,
  onEdit = null,
  onShare = null,
  onFavorite = null,
  showEditButton = false,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock business data for demonstration
  const businessData = business || {
    businessName: "Akosua's Beauty Salon",
    email: "akosua@beautysalon.com",
    contact: "+233244567890",
    social: {
      facebook: "akosuabeauty",
      twitter: "akosuabeauty",
      instagram: "akosuabeauty",
      linkedin: "akosua-beauty-salon"
    },
    physicalAddress: "123 Main Street, Adum, Kumasi",
    region: "Ashanti Region",
    district: "Kumasi Metropolitan",
    town: "Kumasi",
    operatingHours: "Mon-Sat: 8:00 AM – 6:00 PM",
    employeeCount: 8,
    category: "Beauty & Wellness",
    description: "Professional beauty salon offering premium hair styling, makeup, and wellness treatments. We specialize in modern techniques combined with traditional Ghanaian beauty practices.",
    services: ["Hair Styling", "Braiding", "Makeup", "Manicure", "Pedicure", "Facial Treatments"],
    rating: 4.8,
    reviewCount: 156,
    yearEstablished: 2018,
    specialties: ["Bridal Makeup", "Traditional Hairstyles", "Hair Extensions", "Skin Care"],
    certifications: ["Licensed Beautician", "Certified Makeup Artist"],
    languages: ["English", "Twi", "Ga"]
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentDay = currentTime.getDay();
  
  const isCurrentlyOpen = (() => {
    if (!businessData.operatingHours) return false;
    const hours = businessData.operatingHours.toLowerCase();
    if (hours.includes('mon-sat') || hours.includes('monday-saturday')) {
      return currentDay >= 1 && currentDay <= 6 && currentHour >= 8 && currentHour < 18;
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: businessData.businessName,
        text: businessData.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    if (onShare) onShare(businessData);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (onFavorite) onFavorite(businessData);
  };

  const location = [businessData.town, businessData.region].filter(Boolean).join(', ');

  return (
    <div className={`max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden ${className}`}>
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleShare}
            className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-200"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleFavorite}
            className={`p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full transition-all duration-200 ${
              isFavorited ? 'text-red-500' : 'text-white hover:bg-opacity-30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end space-x-4">
            <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-4 border-white border-opacity-30">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold mb-1">{businessData.businessName}</h1>
              <p className="text-lg opacity-90 mb-2">{businessData.category}</p>
              <div className="flex items-center space-x-4 text-sm opacity-80">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                  <span>{businessData.rating} ({businessData.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-sm text-gray-700">{businessData.operatingHours}</span>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${
              isCurrentlyOpen 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isCurrentlyOpen ? 'Open Now' : 'Closed Now'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">{businessData.employeeCount} employees</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            <span>WhatsApp</span>
          </button>
          
          <button
            onClick={handleCallClick}
            className="flex items-center justify-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Phone className="w-6 h-6" />
            <span>Call Now</span>
          </button>
          
          <button
            onClick={handleEmailClick}
            className="flex items-center justify-center space-x-3 bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Mail className="w-6 h-6" />
            <span>Email</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'services', label: 'Services' },
            { id: 'contact', label: 'Contact' },
            { id: 'about', label: 'About' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">About This Business</h3>
              <p className="text-gray-700 leading-relaxed">{businessData.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Business Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Established {businessData.yearEstablished}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{businessData.district}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{businessData.languages?.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {businessData.specialties?.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessData.services?.map((service, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-semibold">{service.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{service}</h4>
                      <p className="text-sm text-gray-600">Professional {service.toLowerCase()} services</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {businessData.certifications && (
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Certifications</h4>
                <div className="flex flex-wrap gap-3">
                  {businessData.certifications.map((cert, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-lg font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Phone className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">{businessData.contact}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-6 h-6 mr-4 text-purple-500" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">{businessData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-6 h-6 mr-4 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-600">{businessData.physicalAddress}</p>
                    <p className="text-sm text-gray-500 mt-1">{businessData.district}, {businessData.region}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {businessData.social?.facebook && (
                  <a
                    href={`https://facebook.com/${businessData.social.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
                {businessData.social?.instagram && (
                  <a
                    href={`https://instagram.com/${businessData.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {businessData.social?.twitter && (
                  <a
                    href={`https://twitter.com/${businessData.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
                {businessData.social?.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${businessData.social.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium mb-2">Business Type</h4>
                    <p className="text-gray-600">{businessData.category}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium mb-2">Year Established</h4>
                    <p className="text-gray-600">{businessData.yearEstablished}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium mb-2">Team Size</h4>
                    <p className="text-gray-600">{businessData.employeeCount} employees</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-gray-600">{businessData.district}</p>
                    <p className="text-sm text-gray-500">{businessData.region}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium mb-2">Languages</h4>
                    <p className="text-gray-600">{businessData.languages?.join(', ')}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium mb-2">Rating</h4>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="text-gray-600">{businessData.rating} ({businessData.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage
// const App = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <BusinessProfile 
//         onEdit={(business) => console.log('Edit:', business)}
//         onShare={(business) => console.log('Share:', business)}
//         onFavorite={(business) => console.log('Favorite:', business)}
//         showEditButton={true}
//       />
//     </div>
//   );
// };

// export default App;