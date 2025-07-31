import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
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
  User,
  Crown,
  TrendingUp,
  BarChart3,
  Target,
  Calendar,
  Star,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const PLAN_FEATURES = {
  free: {
    name: 'Free',
    color: 'gray',
    features: ['basic_listing', 'contact_display', 'search_visibility']
  },
  basic: {
    name: 'Basic',
    color: 'green',
    features: ['basic_listing', 'contact_display', 'search_visibility', 'featured_search', 'customer_reviews', 'whatsapp_integration', 'priority_support']
  },
  standard: {
    name: 'Standard',
    color: 'blue',
    features: ['basic_listing', 'contact_display', 'search_visibility', 'featured_search', 'customer_reviews', 'whatsapp_integration', 'priority_support', 'homepage_featured', 'analytics_dashboard', 'lead_generation', 'email_marketing']
  },
  pro: {
    name: 'Pro',
    color: 'purple',
    features: ['basic_listing', 'contact_display', 'search_visibility', 'featured_search', 'customer_reviews', 'whatsapp_integration', 'priority_support', 'homepage_featured', 'analytics_dashboard', 'lead_generation', 'email_marketing', 'banner_placement', 'social_media_promotion', 'seo_optimization', 'account_manager']
  }
};

const BusinessDashboard = ({ 
  onEditBusinessInfo = () => console.log('Edit business info clicked'),
  onViewProfile = () => console.log('View profile clicked'),
  onCallNow = () => console.log('Call now clicked'),
  onWhatsApp = () => console.log('WhatsApp clicked'),
  onShareWhatsApp = () => console.log('Share via WhatsApp clicked'),
  onUpgrade = () => console.log('Upgrade clicked')
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [business, setBusiness] = useState(null);
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserAndBusiness();
  }, []);

  const getCurrentUserAndBusiness = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user found. Please log in.');

      setUser(user);

      // Get user profile with subscription info
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.warn('Profile not found, creating default profile');
        // Create default profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            email: user.email,
            subscription_plan: 'free',
            subscription_status: 'active'
          }])
          .select()
          .single();
        
        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        setProfile(profileData);
      }

      // Get business data
      await fetchBusinessData(user.id, user.email);
      
      // Get analytics and leads if user has access
      if (profileData?.subscription_plan && hasFeature(profileData.subscription_plan, 'analytics_dashboard')) {
        await fetchAnalytics(user.id);
      }
      
      if (profileData?.subscription_plan && hasFeature(profileData.subscription_plan, 'lead_generation')) {
        await fetchLeads(user.id);
      }

    } catch (err) {
      console.error('Error fetching user business:', err);
      setError(err.message || 'Failed to load business data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessData = async (userId, userEmail) => {
    try {
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (businessError) {
        const { data: businessByEmail, error: emailError } = await supabase
          .from('businesses')
          .select('*')
          .eq('email', userEmail)
          .single();

        if (emailError) {
          throw new Error('No business found for this user. Please register your business first.');
        }
        setBusiness(businessByEmail);
        return;
      }

      setBusiness(businessData);
    } catch (err) {
      throw err;
    }
  };

  const fetchAnalytics = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('business_analytics')
        .select('*')
        .eq('user_id', userId)
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (error) throw error;

      // Aggregate analytics
      const totalViews = data.reduce((sum, day) => sum + (day.page_views || 0), 0);
      const totalContacts = data.reduce((sum, day) => sum + (day.contact_clicks || 0), 0);
      const totalWhatsApp = data.reduce((sum, day) => sum + (day.whatsapp_clicks || 0), 0);
      const totalShares = data.reduce((sum, day) => sum + (day.profile_shares || 0), 0);

      setAnalytics({
        totalViews,
        totalContacts,
        totalWhatsApp,
        totalShares,
        dailyData: data
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  const fetchLeads = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('business_leads')
        .select('*')
        .eq('business_id', business?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const hasFeature = (plan, feature) => {
    return PLAN_FEATURES[plan]?.features.includes(feature) || false;
  };

  const handleUpgrade = () => {
    onUpgrade();
    // Navigate to pricing page or open upgrade modal
    window.location.href = '/pricing';
  };

  const UpgradePrompt = ({ feature, title, description }) => (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Lock className="w-8 h-8 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <button
            onClick={handleUpgrade}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
          >
            <Crown className="w-4 h-4" />
            Upgrade to Access
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const PlanBadge = ({ plan }) => {
    const planInfo = PLAN_FEATURES[plan] || PLAN_FEATURES.free;
    const colorClasses = {
      gray: 'bg-gray-100 text-gray-800 border-gray-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300'
    };

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[planInfo.color]}`}>
        {plan !== 'free' && <Crown className="w-4 h-4" />}
        {planInfo.name} Plan
      </div>
    );
  };

  // Loading and error states remain the same...
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

  const currentPlan = profile?.subscription_plan || 'free';
  const services = business?.business_services ? 
    (typeof business.business_services === 'string' ? 
      JSON.parse(business.business_services) : 
      business.business_services) : [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header with Plan Badge */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
                  <PlanBadge plan={currentPlan} />
                </div>
                <p className="text-gray-600">Manage your business profile and access premium features</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {currentPlan === 'free' && (
                  <button 
                    onClick={handleUpgrade}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    <Crown className="w-4 h-4" />
                    Upgrade Now
                  </button>
                )}
                <button 
                  onClick={() => window.open(`/business/${encodeURIComponent(business.business_name)}`, '_blank')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Profile */}
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

                {/* Featured Status */}
                {hasFeature(currentPlan, 'featured_search') && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">Featured in Search Results</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                )}

                {/* Rest of business profile content... */}
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{business.business_name}</h3>
                    <p className="text-lg text-indigo-600 mb-4">{business.industry || 'Business'}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => {
                          if (business.contact) {
                            window.location.href = `tel:${business.contact}`;
                          }
                          onCallNow();
                        }}
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
                      
                      {hasFeature(currentPlan, 'whatsapp_integration') ? (
                        <button 
                          onClick={() => {
                            if (business.contact) {
                              const whatsappNumber = business.contact.replace(/\s+/g, '').replace(/^\+/, '');
                              window.open(`https://wa.me/${whatsappNumber}`, '_blank');
                            }
                            onWhatsApp();
                          }}
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
                      ) : (
                        <button 
                          onClick={handleUpgrade}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <Lock className="w-4 h-4" />
                          WhatsApp (Upgrade)
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Business details remain the same... */}
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
                          <p className="text-sm text-gray-500">
                            {[business.town, business.region].filter(Boolean).join(', ') || 'Location not specified'}
                          </p>
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

                  {business.business_description && (
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed">{business.business_description}</p>
                    </div>
                  )}

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

              {/* Analytics Dashboard */}
              {hasFeature(currentPlan, 'analytics_dashboard') ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Premium Feature
                    </div>
                  </div>
                  
                  {analytics ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Page Views</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{analytics.totalViews}</p>
                        <p className="text-xs text-blue-600">Last 30 days</p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-green-900">Contact Clicks</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{analytics.totalContacts}</p>
                        <p className="text-xs text-green-600">Last 30 days</p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium text-purple-900">WhatsApp</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{analytics.totalWhatsApp}</p>
                        <p className="text-xs text-purple-600">Last 30 days</p>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Share2 className="w-5 h-5 text-orange-600" />
                          <span className="text-sm font-medium text-orange-900">Shares</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{analytics.totalShares}</p>
                        <p className="text-xs text-orange-600">Last 30 days</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">No analytics data available yet</p>
                      <p className="text-sm text-gray-500">Data will appear once customers start viewing your profile</p>
                    </div>
                  )}
                </div>
              ) : (
                <UpgradePrompt 
                  feature="analytics_dashboard"
                  title="Analytics Dashboard"
                  description="Track your business performance with detailed analytics. See page views, contact clicks, and customer engagement metrics."
                />
              )}

              {/* Lead Generation */}
              {hasFeature(currentPlan, 'lead_generation') ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Premium Feature
                    </div>
                  </div>
                  
                  {leads.length > 0 ? (
                    <div className="space-y-4">
                      {leads.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{lead.customer_name || 'Anonymous'}</h4>
                              <p className="text-sm text-gray-600">{lead.customer_email || lead.customer_phone}</p>
                              <p className="text-sm text-gray-500 mt-1">{lead.message}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                              lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                              lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            {new Date(lead.created_at).toLocaleDateString()} via {lead.source}
                          </div>
                        </div>
                      ))}
                      
                      {leads.length > 5 && (
                        <button className="w-full py-2 text-center text-blue-600 hover:text-blue-700 font-medium">
                          View All Leads ({leads.length})
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">No leads yet</p>
                      <p className="text-sm text-gray-500">Leads will appear when customers contact you through your profile</p>
                    </div>
                  )}
                </div>
              ) : (
                <UpgradePrompt 
                  feature="lead_generation"
                  title="Lead Generation Tools"
                  description="Capture and manage customer leads with contact forms, inquiry tracking, and follow-up reminders."
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
                <div className="text-center mb-4">
                  <PlanBadge plan={currentPlan} />
                  <div className="mt-3">
                    {currentPlan === 'free' ? (
                      <p className="text-2xl font-bold text-gray-900">GHS 0</p>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">
                        GHS {currentPlan === 'basic' ? '100' : currentPlan === 'standard' ? '200' : '400'}
                        <span className="text-sm font-normal text-gray-600">/month</span>
                      </p>
                    )}
                  </div>
                </div>

                {currentPlan === 'free' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Upgrade to get more customers and grow your business faster!
                      </p>
                    </div>
                    <button
                      onClick={handleUpgrade}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}

                {profile?.subscription_end_date && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        Renews on {new Date(profile.subscription_end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

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

              {/* Premium Features */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                <div className="space-y-3">
                  {[
                    { feature: 'featured_search', icon: Star, title: 'Featured in Search', desc: 'Appear at the top of search results' },
                    { feature: 'analytics_dashboard', icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track views and engagement' },
                    { feature: 'lead_generation', icon: Target, title: 'Lead Generation', desc: 'Capture customer inquiries' },
                    { feature: 'homepage_featured', icon: TrendingUp, title: 'Homepage Featured', desc: 'Featured on homepage' },
                    { feature: 'social_media_promotion', icon: Share2, title: 'Social Media Promotion', desc: 'Promoted on social channels' }
                  ].map(({ feature, icon: Icon, title, desc }) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        hasFeature(currentPlan, feature) 
                          ? 'bg-green-100' 
                          : 'bg-gray-100'
                      }`}>
                        {hasFeature(currentPlan, feature) ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${
                          hasFeature(currentPlan, feature) ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {title}
                        </p>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {currentPlan === 'free' && (
                  <button
                    onClick={handleUpgrade}
                    className="w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Unlock All Features
                  </button>
                )}
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
                      onClick={async () => {
                        try {
                          const newVisibility = !isVisible;
                          const { error } = await supabase
                            .from('businesses')
                            .update({ is_visible: newVisibility })
                            .eq('id', business.id);

                          if (error) throw error;
                          setIsVisible(newVisibility);
                        } catch (err) {
                          console.error('Error updating visibility:', err);
                        }
                      }}
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