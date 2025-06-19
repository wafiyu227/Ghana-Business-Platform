import React from "react";
import { MapPin, Phone, Mail, Clock, Users, Globe } from "lucide-react";
import { useBusiness } from "../../../BusinessContext"; 
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

function BusinessDashboard ()  {
  const FacebookSVG = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5v-2.3c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V11H17l-.5 3h-2v7A10 10 0 0 0 22 12z" />
    </svg>
  );

  const TwitterSVG = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.15 9.15 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.15 2c-2.5 0-4.5 2.17-4.5 4.84 0 .38.04.75.12 1.1A12.94 12.94 0 0 1 3.1 2.1a4.93 4.93 0 0 0-.61 2.44c0 1.68.83 3.18 2.1 4.05A4.42 4.42 0 0 1 2 8.03v.06c0 2.34 1.6 4.3 3.75 4.74a4.52 4.52 0 0 1-2.05.08c.58 1.94 2.27 3.35 4.26 3.39a9.06 9.06 0 0 1-5.62 1.99c-.37 0-.74-.02-1.1-.06A12.78 12.78 0 0 0 7 21c8.3 0 12.84-7.36 12.84-13.75 0-.21 0-.42-.02-.63A9.4 9.4 0 0 0 23 3z" />
    </svg>
  );

  const InstagramSVG = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9zm4.75-2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
    </svg>
  );

  const LinkedinSVG = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96v5.66h-3.55V9h3.4v1.56h.05c.47-.89 1.61-1.82 3.31-1.82 3.54 0 4.2 2.33 4.2 5.36v6.35zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );


  const { businessData, loading, error, refreshBusinessData } = useBusiness();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!businessData) {
    return <div>No business data found</div>;
  }
  
  // Use businessData normally
  console.log(businessData.businessName);

  const InfoCard = ({ icon: Icon, title, content, className = "" }) => (
    <div
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}
    >
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
          <div className="text-gray-600">{content}</div>
        </div>
      </div>
    </div>
  );

  const SocialIcon = ({ icon: IconSVG, handle, platform }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200">
      <div className="bg-blue-600 p-2 rounded-lg">
        <IconSVG />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800 capitalize">
          {platform}
        </p>
        <p className="text-sm text-gray-600">@{handle}</p>
      </div>
    </div>
  );

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {businessData.businessName}
              </h1>
              <p className="text-gray-600 mt-1">Business Profile Dashboard</p>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {businessData.businessName}
                </h2>
                <div className="flex flex-wrap gap-4 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {businessData.town}, {businessData.region}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{businessData.employeeCount} employees</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-blue-100">Business Status</p>
                  <p className="text-lg font-semibold">Operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={Mail}
            title="Email Address"
            content={
              <a
                href={`mailto:${businessData.email}`}
                className="text-blue-600 hover:underline"
              >
                {businessData.email}
              </a>
            }
          />

          <InfoCard
            icon={Phone}
            title="Contact Number"
            content={
              <a
                href={`tel:${businessData.contact}`}
                className="text-blue-600 hover:underline"
              >
                {businessData.contact}
              </a>
            }
          />

          <InfoCard
            icon={Clock}
            title="Operating Hours"
            content={businessData.operatingHours}
          />

          <InfoCard
            icon={MapPin}
            title="Physical Address"
            content={
              <div>
                <p>{businessData.physicalAddress}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {businessData.town}, {businessData.district},{" "}
                  {businessData.region}
                </p>
              </div>
            }
            className="md:col-span-2"
          />

          <InfoCard
            icon={Users}
            title="Team Size"
            content={`${businessData.employeeCount} employees`}
          />
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Social Media Presence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessData.social.facebook && (
              <SocialIcon
                icon={FacebookSVG}
                handle={businessData.social.facebook}
                platform="facebook"
              />
            )}
            {businessData.social.twitter && (
              <SocialIcon
                icon={TwitterSVG}
                handle={businessData.social.twitter}
                platform="twitter"
              />
            )}
            {businessData.social.instagram && (
              <SocialIcon
                icon={InstagramSVG}
                handle={businessData.social.instagram}
                platform="instagram"
              />
            )}
            {businessData.social.linkedin && (
              <SocialIcon
                icon={LinkedinSVG}
                handle={businessData.social.linkedin}
                platform="linkedin"
              />
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1</p>
            <p className="text-sm text-gray-600">Location</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {businessData.employeeCount.split("-")[1] ||
                businessData.employeeCount}
            </p>
            <p className="text-sm text-gray-600">Max Employees</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Object.values(businessData.social).filter(Boolean).length}
            </p>
            <p className="text-sm text-gray-600">Social Platforms</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">6</p>
            <p className="text-sm text-gray-600">Days/Week</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BusinessDashboard;
