import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { supabase } from '../supabaseClient';
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
  Share2,
  Heart,
  Loader2,
  AlertCircle
} from 'lucide-react';

export const BusinessProfile = ({ 
  businessId = null,
  businessName = null,
  onEdit = null,
  onShare = null,
  onFavorite = null,
  showEditButton = false,
  className = ""
}) => {
  const { business_name } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get business identifier from props or URL params
  const currentBusinessId = businessId;
  const currentBusinessName = businessName || business_name;

  useEffect(() => {
    if (currentBusinessId) {
      fetchBusinessById(currentBusinessId);
    } else if (currentBusinessName) {
      fetchBusinessByName(currentBusinessName);
    } else {
      setError('No business identifier provided');
      setLoading(false);
    }
  }, [currentBusinessId, currentBusinessName]);

  const fetchBusinessById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('Business not found');
      }

      setBusiness(data);
    } catch (err) {
      console.error('Error fetching business by ID:', err);
      setError(err.message || 'Failed to load business data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessByName = async (name) => {
    try {
      setLoading(true);
      setError(null);
      
      // URL decode the business name and normalize it
      const decodedName = decodeURIComponent(name);
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .ilike('business_name', `%${decodedName}%`)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('Business not found');
      }

      setBusiness(data);
    } catch (err) {
      console.error('Error fetching business by name:', err);
      setError(err.message || 'Failed to load business data');
    } finally {
      setLoading(false);
    }
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentDay = currentTime.getDay();
  
  const isCurrentlyOpen = (() => {
    if (!business?.operating_hours) return false;
    const hours = business.operating_hours.toLowerCase();
    if (hours.includes('mon-sat') || hours.includes('monday-saturday')) {
      return currentDay >= 1 && currentDay <= 6 && currentHour >= 8 && currentHour < 18;
    }
    return false;
  })();

  const handleWhatsAppClick = () => {
    const number = business?.contact;
    if (number) {
      window.open(`https://wa.me/${number.replace(/\D/g, '')}`, '_blank');
    }
  };

  const handleCallClick = () => {
    if (business?.contact) {
      window.location.href = `tel:${business.contact}`;
    }
  };

  const handleEmailClick = () => {
    if (business?.email) {
      window.location.href = `mailto:${business.email}`;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business?.business_name || 'Business Profile',
        text: business?.business_description || 'Check out this business profile',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    if (onShare) onShare(business);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (onFavorite) onFavorite(business);
  };

  // Parse services if it's a string
  const getServices = () => {
    if (!business?.business_services) return [];
    if (typeof business.business_services === 'string') {
      try {
        return JSON.parse(business.business_services);
      } catch {
        return business.business_services.split(',').map(s => s.trim());
      }
    }
    return Array.isArray(business.business_services) ? business.business_services : [];
  };

  // Get social media links
  const getSocialMedia = () => {
    return {
      facebook: business?.facebook || null,
      twitter: business?.twitter || null,
      instagram: business?.instagram || null,
      linkedin: business?.linkedin || null
    };
  };

  const location = [business?.town, business?.region].filter(Boolean).join(', ');

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto my-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-gray-600">Loading business profile...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto my-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2">Error Loading Business</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  if (currentBusinessId) {
                    fetchBusinessById(currentBusinessId);
                  } else if (currentBusinessName) {
                    fetchBusinessByName(currentBusinessName);
                  }
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // No business found
  if (!business) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto my-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Business Not Found</h2>
              <p className="text-gray-600">The business you're looking for doesn't exist or has been removed.</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const services = getServices();
  const socialMedia = getSocialMedia();

  return (
    <>
      <Header />
      <div className={`max-w-4xl mx-auto my-10 bg-white rounded-3xl shadow-2xl overflow-hidden ${className}`}>
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
                <h1 className="text-3xl font-bold mb-1">{business.business_name}</h1>
                <p className="text-lg opacity-90 mb-2">{business.industry}</p>
                <div className="flex items-center space-x-4 text-sm opacity-80">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{location}</span>
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
                <span className="text-sm text-gray-700">
                  {business.operating_hours || 'Hours not specified'}
                </span>
              </div>
              {business.operating_hours && (
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                  isCurrentlyOpen 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {isCurrentlyOpen ? 'Open Now' : 'Closed Now'}
                </span>
              )}
            </div>
            {business.employee_count && (
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">{business.employee_count} employees</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleWhatsAppClick}
              disabled={!business.contact}
              className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                business.contact 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
              <span>WhatsApp</span>
            </button>
            
            <button
              onClick={handleCallClick}
              disabled={!business.contact}
              className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                business.contact 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Phone className="w-6 h-6" />
              <span>Call Now</span>
            </button>
            
            <button
              onClick={handleEmailClick}
              disabled={!business.email}
              className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                business.email 
                  ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
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
                <p className="text-gray-700 leading-relaxed">
                  {business.business_description || 'No description available for this business.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Business Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Building className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Industry</p>
                        <p className="font-medium">{business.industry || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{business.district || 'Not specified'}</p>
                      </div>
                    </div>
                    {business.employee_count && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Users className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Team Size</p>
                          <p className="font-medium">{business.employee_count} employees</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    {business.contact && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{business.contact}</p>
                        </div>
                      </div>
                    )}
                    {business.email && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 mr-3 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{business.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Our Services</h3>
              {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">{service.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{service}</h4>
                          <p className="text-sm text-gray-600">Professional {service.toLowerCase()} services</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Listed</h3>
                  <p className="text-gray-500">This business hasn't added their services yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-4">
                  {business.contact && (
                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <Phone className="w-6 h-6 mr-4 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-gray-600">{business.contact}</p>
                      </div>
                    </div>
                  )}
                  
                  {business.email && (
                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <Mail className="w-6 h-6 mr-4 text-purple-500" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-600">{business.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {business.physical_address && (
                    <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                      <MapPin className="w-6 h-6 mr-4 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Address</h4>
                        <p className="text-gray-600">{business.physical_address}</p>
                        <p className="text-sm text-gray-500 mt-1">{business.district}, {business.region}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {(socialMedia.facebook || socialMedia.instagram || socialMedia.twitter || socialMedia.linkedin) && (
                <div>
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialMedia.facebook && (
                      <a
                        href={socialMedia.facebook.startsWith('http') ? socialMedia.facebook : `https://facebook.com/${socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                    )}
                    {socialMedia.instagram && (
                      <a
                        href={socialMedia.instagram.startsWith('http') ? socialMedia.instagram : `https://instagram.com/${socialMedia.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    {socialMedia.twitter && (
                      <a
                        href={socialMedia.twitter.startsWith('http') ? socialMedia.twitter : `https://twitter.com/${socialMedia.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors"
                      >
                        <Twitter className="w-6 h-6" />
                      </a>
                    )}
                    {socialMedia.linkedin && (
                      <a
                        href={socialMedia.linkedin.startsWith('http') ? socialMedia.linkedin : `https://linkedin.com/in/${socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
                      >
                        <Linkedin className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>
              )}
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
                      <p className="text-gray-600">{business.industry || 'Not specified'}</p>
                    </div>
                    
                    {business.employee_count && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium mb-2">Team Size</h4>
                        <p className="text-gray-600">{business.employee_count} employees</p>
                      </div>
                    )}
                    
                    {business.operating_hours && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium mb-2">Operating Hours</h4>
                        <p className="text-gray-600">{business.operating_hours}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-medium mb-2">Location</h4>
                      <p className="text-gray-600">{business.district || 'Not specified'}</p>
                      <p className="text-sm text-gray-500">{business.region || 'Not specified'}</p>
                    </div>
                    
                    {business.town && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium mb-2">Town/City</h4>
                        <p className="text-gray-600">{business.town}</p>
                      </div>
                    )}
                    
                    {business.physical_address && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium mb-2">Address</h4>
                        <p className="text-gray-600">{business.physical_address}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
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