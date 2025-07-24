import React, { useState, useEffect } from 'react';
import Header from '../common/Header'
import Footer from '../common/Footer'
import { supabase } from '../../supabaseClient';
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
  ExternalLink,
  Loader2,
  AlertCircle,
  User
} from 'lucide-react';

const BusinessDashboard = ({ 
  onEditBusinessInfo = () => console.log('Edit business info clicked'),
  onViewProfile = () => console.log('View profile clicked'),
  onCallNow = () => console.log('Call now clicked'),
  onWhatsApp = () => console.log('WhatsApp clicked'),
  onShareWhatsApp = () => console.log('Share via WhatsApp clicked')
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user and fetch their business
    getCurrentUserAndBusiness();
  }, []);

  const getCurrentUserAndBusiness = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error('No authenticated user found. Please log in.');
      }

      setUser(user);

      // Method 1: If you store business_id in user profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles') // or whatever your user profiles table is called
        .select('business_id')
        .eq('id', user.id)
        .single();

      if (!profileError && profile?.business_id) {
        await fetchBusinessData(profile.business_id);
        return;
      }

      // Method 2: If business table has user_id field
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id) // assuming you have user_id field in businesses table
        .single();

      if (businessError) {
        // Method 3: If business table has email field matching user email
        const { data: businessByEmail, error: emailError } = await supabase
          .from('businesses')
          .select('*')
          .eq('email', user.email)
          .single();

        if (emailError) {
          throw new Error('No business found for this user. Please register your business first.');
        }

        setBusiness(businessByEmail);
        return;
      }

      setBusiness(businessData);

    } catch (err) {
      console.error('Error fetching user business:', err);
      setError(err.message || 'Failed to load business data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessData = async (id) => {
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
      // Set visibility based on business data if you have a visibility field
      // setIsVisible(data.is_visible ?? true);
    } catch (err) {
      console.error('Error fetching business data:', err);
      setError(err.message || 'Failed to load business data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshProfile = async () => {
    await getCurrentUserAndBusiness();
  };

  const handleVisibilityToggle = async () => {
    if (!business) return;

    try {
      const newVisibility = !isVisible;
      
      // Update in database if you have a visibility field
      const { error } = await supabase
        .from('businesses')
        .update({ is_visible: newVisibility })
        .eq('id', business.id);

      if (error) {
        throw error;
      }

      setIsVisible(newVisibility);
    } catch (err) {
      console.error('Error updating visibility:', err);
      // You might want to show a toast notification here
    }
  };

  const formatPhoneForWhatsApp = (phone) => {
    if (!phone) return '';
    return phone.replace(/\s+/g, '').replace(/^\+/, '');
  };

  const handleCallNow = () => {
    if (business?.contact) {
      window.location.href = `tel:${business.contact}`;
    }
    onCallNow();
  };

  const handleWhatsApp = () => {
    if (business?.contact) {
      const whatsappNumber = formatPhoneForWhatsApp(business.contact);
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    }
    onWhatsApp();
  };

  const handleShareWhatsApp = () => {
    if (business) {
      const businessUrl = `${window.location.origin}/business/${encodeURIComponent(business.business_name)}`;
      const message = `Check out ${business.business_name} - ${business.industry || 'Business'}\n${businessUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
    onShareWhatsApp();
  };

  const handleViewProfile = () => {
    if (business) {
      const profileUrl = `/business/${encodeURIComponent(business.business_name)}`;
      window.open(profileUrl, '_blank');
    }
    onViewProfile();
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                  <p className="text-gray-600">Loading your business dashboard...</p>
                </div>
              </div>
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
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                  <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={getCurrentUserAndBusiness}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
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
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h2 className="text-xl font-semibold mb-2">No Business Found</h2>
                  <p className="text-gray-600">Please check your business registration or contact support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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

  const services = getServices();
  const location = [business.town, business.region].filter(Boolean).join(', ');

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
                  onClick={handleViewProfile}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Public Profile
                </button>
                <button 
                  onClick={handleRefreshProfile}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button 
                  onClick={handleShareWhatsApp}
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{business.business_name}</h3>
                    <p className="text-lg text-indigo-600 mb-4">{business.industry || 'Business'}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={handleCallNow}
                        disabled={!business.contact}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          business.contact 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </button>
                      <button 
                        onClick={handleWhatsApp}
                        disabled={!business.contact}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          business.contact 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
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
                          <p className="text-gray-600">{business.contact || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-gray-600">{business.email || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Address</p>
                          <p className="text-gray-600">{business.physical_address || 'Not provided'}</p>
                          <p className="text-sm text-gray-500">{location || 'Location not specified'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Operating Hours</p>
                          <p className="text-gray-600">{business.operating_hours || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Description */}
                  {business.business_description && (
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed">{business.business_description}</p>
                    </div>
                  )}

                  {/* Services */}
                  {services.length > 0 && (
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {services.map((service, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
                      <p className="font-medium text-gray-900">
                        {business.employee_count || 'N/A'} Employees
                      </p>
                      <p className="text-sm text-gray-500">Team size</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{business.region || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{business.town || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {business.operating_hours ? 'Operating' : 'Hours not set'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {business.operating_hours || 'Set your hours'}
                      </p>
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