import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Globe,
  Camera,
  Upload,
  Check,
} from "lucide-react";



export default function BusinessRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    businessName: "",
    businessType: "",
    registrationNumber: "",
    tinNumber: "",
    industry: "",
    businessDescription: "",

    // Contact Information
    email: "",
    phone: "",
    alternativePhone: "",
    website: "",

    // Address Information
    physicalAddress: "",
    region: "",
    district: "",
    town: "",
    postalAddress: "",
    gpsAddress: "",

    // Owner Information
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerNationalId: "",

    // Business Operations
    operatingHours: "",
    employeeCount: "",
    yearEstablished: "",
    businessLicense: "",

    // Services/Products
    servicesProducts: "",
    targetMarket: "",

    // Social Media
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",

    // Documents
    businessCertificate: null,
    taxClearance: null,
    businessLicense: null,
    ownerIdCopy: null,
  });

  const steps = [
    { id: 1, title: "Business Info", icon: Building2 },
    { id: 2, title: "Contact Details", icon: Phone },
    { id: 3, title: "Location", icon: MapPin },
    { id: 4, title: "Owner Info", icon: User },
    { id: 5, title: "Operations", icon: FileText },
    { id: 6, title: "Documents", icon: Upload },
  ];

  const regions = [
    "Greater Accra",
    "Ashanti",
    "Western",
    "Central",
    "Eastern",
    "Northern",
    "Upper East",
    "Upper West",
    "Volta",
    "Brong Ahafo",
    "Western North",
    "Ahafo",
    "Bono East",
    "Oti",
    "North East",
    "Savannah",
  ];

  const businessTypes = [
    "Sole Proprietorship",
    "Partnership",
    "Private Limited Company",
    "Public Limited Company",
    "Non-Profit Organization",
    "Cooperative",
  ];

  const industries = [
    "Agriculture",
    "Manufacturing",
    "Construction",
    "Retail & Wholesale",
    "Food & Beverage",
    "Technology",
    "Healthcare",
    "Education",
    "Financial Services",
    "Transportation",
    "Tourism & Hospitality",
    "Real Estate",
    "Professional Services",
    "Entertainment",
    "Other",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Business registration submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Link to="/">
                <Building2 className="h-8 w-8 text-white" />
              </Link>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Ghana Business Platform
              </h1>
              <p className="text-blue-600 font-medium">
                Register Your Business Today
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      currentStep >= step.id
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mt-6 ${
                        currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Building2 className="h-6 w-6 mr-3 text-blue-600" />
                  Business Information
                </h2>
                <p className="text-gray-600 mt-1">
                  Tell us about your business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your business name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) =>
                      handleInputChange("businessType", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      handleInputChange("registrationNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Company registration number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    TIN Number
                  </label>
                  <input
                    type="text"
                    value={formData.tinNumber}
                    onChange={(e) =>
                      handleInputChange("tinNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Tax Identification Number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year Established
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2025"
                    value={formData.yearEstablished}
                    onChange={(e) =>
                      handleInputChange("yearEstablished", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="2020"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) =>
                    handleInputChange("businessDescription", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Describe what your business does..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-blue-600" />
                  Contact Information
                </h2>
                <p className="text-gray-600 mt-1">
                  How can customers reach you?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="business@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+233 XX XXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternative Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.alternativePhone}
                    onChange={(e) =>
                      handleInputChange("alternativePhone", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://www.yourbusiness.com"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Social Media (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={formData.facebook}
                      onChange={(e) =>
                        handleInputChange("facebook", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://facebook.com/yourbusiness"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={formData.instagram}
                      onChange={(e) =>
                        handleInputChange("instagram", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://instagram.com/yourbusiness"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) =>
                        handleInputChange("twitter", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://twitter.com/yourbusiness"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://linkedin.com/company/yourbusiness"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                  Business Location
                </h2>
                <p className="text-gray-600 mt-1">
                  Where is your business located?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Physical Address *
                  </label>
                  <textarea
                    value={formData.physicalAddress}
                    onChange={(e) =>
                      handleInputChange("physicalAddress", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter full physical address of your business"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Region *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      handleInputChange("district", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter district"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Town/City *
                  </label>
                  <input
                    type="text"
                    value={formData.town}
                    onChange={(e) => handleInputChange("town", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter town or city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GPS Address
                  </label>
                  <input
                    type="text"
                    value={formData.gpsAddress}
                    onChange={(e) =>
                      handleInputChange("gpsAddress", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="GA-123-4567"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Address
                  </label>
                  <textarea
                    value={formData.postalAddress}
                    onChange={(e) =>
                      handleInputChange("postalAddress", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="P.O. Box address if different from physical address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Owner Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <User className="h-6 w-6 mr-3 text-blue-600" />
                  Owner Information
                </h2>
                <p className="text-gray-600 mt-1">
                  Details about the business owner/director
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Owner Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) =>
                      handleInputChange("ownerName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Full name of business owner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Owner Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) =>
                      handleInputChange("ownerPhone", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+233 XX XXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Owner Email *
                  </label>
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) =>
                      handleInputChange("ownerEmail", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="owner@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    National ID/Passport *
                  </label>
                  <input
                    type="text"
                    value={formData.ownerNationalId}
                    onChange={(e) =>
                      handleInputChange("ownerNationalId", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="GHA-123456789-1"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Business Operations */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-blue-600" />
                  Business Operations
                </h2>
                <p className="text-gray-600 mt-1">
                  Tell us about your business operations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) =>
                      handleInputChange("operatingHours", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Mon-Fri: 8:00AM - 6:00PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) =>
                      handleInputChange("employeeCount", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select range</option>
                    <option value="1">Just me (1)</option>
                    <option value="2-5">2-5 employees</option>
                    <option value="6-10">6-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="100+">100+ employees</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Services/Products Offered *
                  </label>
                  <textarea
                    value={formData.servicesProducts}
                    onChange={(e) =>
                      handleInputChange("servicesProducts", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Describe the main services or products your business offers..."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Market
                  </label>
                  <textarea
                    value={formData.targetMarket}
                    onChange={(e) =>
                      handleInputChange("targetMarket", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Who are your target customers? (e.g., individuals, businesses, government, etc.)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Documents */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Upload className="h-6 w-6 mr-3 text-blue-600" />
                  Required Documents
                </h2>
                <p className="text-gray-600 mt-1">
                  Upload the necessary business documents
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    key: "businessCertificate",
                    label: "Business Registration Certificate",
                    required: true,
                  },
                  {
                    key: "taxClearance",
                    label: "Tax Clearance Certificate",
                    required: false,
                  },
                  {
                    key: "businessLicense",
                    label: "Business Operating License",
                    required: false,
                  },
                  {
                    key: "ownerIdCopy",
                    label: "Owner ID/Passport Copy",
                    required: true,
                  },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {doc.label} {doc.required && "*"}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(doc.key, e.target.files[0])
                        }
                        className="hidden"
                        id={doc.key}
                      />
                      <label
                        htmlFor={doc.key}
                        className="inline-flex items-center px-4 py-2 bg-green-50 text-blue-700 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Choose File
                      </label>
                      {formData[doc.key] && (
                        <p className="text-sm text-blue-600 mt-2">
                          ✓ {formData[doc.key].name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">
                      Document Requirements
                    </h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Files must be in PDF, JPG, or PNG format</li>
                      <li>• Maximum file size: 5MB per document</li>
                      <li>• Ensure documents are clear and legible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
              >
                Submit Registration
              </button>
            )}
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Phone className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Call Us</p>
                <p className="text-sm text-blue-700">+233 XX XXX XXXX</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Email Support
                </p>
                <p className="text-sm text-blue-700">help@ghana-business.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
              <Globe className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Online Help
                </p>
                <p className="text-sm text-yellow-700">Visit our FAQ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
