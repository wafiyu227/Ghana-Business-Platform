import React, { useState } from 'react';
import Header from '../common/Header'
import Footer from '../common/Footer'
import { 
  Phone, 
  MessageCircle, 
  Eye, 
  EyeOff, 
  Edit3, 
  RefreshCw, 
  Share2, 
  MapPin, 
  Mail, 
  Clock, 
  Users, 
  ExternalLink 
} from 'lucide-react';

const BusinessDashboard = ({ 
  businessData = {
    businessName: "Kofi's Electronics Store",
    category: "Electronics & Technology",
    contact: "+233 24 123 4567",
    email: "info@kofiselectronics.com",
    physicalAddress: "Shop 15, Accra Mall, East Legon",
    region: "Greater Accra",
    town: "Accra",
    employeeCount: 8,
    operatingHours: "Mon-Sat: 9AM-7PM, Sun: 10AM-5PM"
  },
  onEditBusinessInfo = () => console.log('Edit business info clicked'),
  onViewProfile = () => console.log('View profile clicked'),
  onRefreshProfile = () => console.log('Refresh profile clicked'),
  onCallNow = () => console.log('Call now clicked'),
  onWhatsApp = () => console.log('WhatsApp clicked'),
  onShareWhatsApp = () => console.log('Share via WhatsApp clicked')
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  };

  const formatPhoneForWhatsApp = (phone) => {
    return phone.replace(/\s+/g, '').replace(/^\+/, '');
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your business profile and settings</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={onViewProfile}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Public Profile
              </button>
              <button 
                onClick={onRefreshProfile}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button 
                onClick={onShareWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Business Profile Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Business Profile</h2>
                <button 
                  onClick={onEditBusinessInfo}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Info
                </button>
              </div>

              <div className="space-y-6">
                {/* Business Header */}
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{businessData.businessName}</h3>
                  <p className="text-lg text-indigo-600 mb-4">{businessData.category}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={onCallNow}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                    <button 
                      onClick={onWhatsApp}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </div>
                </div>

                {/* Business Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Contact</p>
                        <p className="text-gray-600">{businessData.contact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{businessData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{businessData.physicalAddress}</p>
                        <p className="text-sm text-gray-500">{businessData.town}, {businessData.region}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Operating Hours</p>
                        <p className="text-gray-600">{businessData.operatingHours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{businessData.employeeCount} Employees</p>
                    <p className="text-sm text-gray-500">Team size</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{businessData.region}</p>
                    <p className="text-sm text-gray-500">{businessData.town}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Operating</p>
                    <p className="text-sm text-gray-500">7 days a week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isVisible ? (
                      <Eye className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {isVisible ? 'Visible to Public' : 'Hidden'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isVisible ? 'Anyone can find your business' : 'Only you can see your profile'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleVisibilityToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isVisible ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isVisible ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  isVisible ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <p className={`text-sm ${
                    isVisible ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {isVisible 
                      ? 'Your business is discoverable by customers searching in your area.'
                      : 'Your business is currently hidden from public searches.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BusinessDashboard;