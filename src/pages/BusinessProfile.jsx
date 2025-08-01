import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { supabase } from "../supabaseClient";
import { trackEvent } from '../services/analyticsService';
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
  AlertCircle,
  Star,
  StarHalf,
  Plus,
  MessageSquare,
  ChevronRight,
  Send,
  X
} from "lucide-react";

export const BusinessProfile = ({
  businessId = null,
  businessName = null,
  onEdit = null,
  onShare = null,
  onFavorite = null,
  showEditButton = false,
  className = "",
}) => {
  const { business_name } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorited, setIsFavorited] = useState(false);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  const [reviewForm, setReviewForm] = useState({
    reviewer_name: "",
    reviewer_email: "",
    rating: 0,
    review_text: "",
  });
  const [submitingReview, setSubmitingReview] = useState(false);

  const currentBusinessId = businessId;
  const currentBusinessName = businessName || business_name;

  // Fetch business
  useEffect(() => {
    if (currentBusinessId) {
      fetchBusinessById(currentBusinessId);
    } else if (currentBusinessName) {
      fetchBusinessByName(currentBusinessName);
    } else {
      setError("No business identifier provided");
      setLoading(false);
    }
  }, [currentBusinessId, currentBusinessName]);

  // Fetch reviews when business is loaded
  useEffect(() => {
    if (business?.id) {
      fetchReviews();

      // 🔹 Track Page View
      trackEvent(business.id, "page_view");
    }
  }, [business?.id]);

  const fetchBusinessById = async (id) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      setBusiness(data);
    } catch (err) {
      setError(err.message || "Failed to load business data");
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessByName = async (name) => {
    try {
      setLoading(true);
      const decodedName = decodeURIComponent(name);
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .ilike("business_name", `%${decodedName}%`)
        .single();
      if (error) throw error;
      setBusiness(data);
    } catch (err) {
      setError(err.message || "Failed to load business data");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("*")
        .eq("business_id", business.id)
        .order("created_at", { ascending: false })
        .limit(3);

      const { data: statsData } = await supabase
        .from("reviews")
        .select("rating")
        .eq("business_id", business.id);

      setReviews(reviewsData || []);

      if (statsData && statsData.length > 0) {
        const totalReviews = statsData.length;
        const averageRating =
          statsData.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews;

        const ratingDistribution = statsData.reduce((acc, review) => {
          acc[review.rating] = (acc[review.rating] || 0) + 1;
          return acc;
        }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

        setReviewStats({
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews,
          ratingDistribution,
        });
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!business?.id || !reviewForm.reviewer_name || !reviewForm.rating) {
      return;
    }

    try {
      setSubmitingReview(true);
      
      const { data, error } = await supabase
        .from("reviews")
        .insert([{
          business_id: business.id,
          reviewer_name: reviewForm.reviewer_name.trim(),
          reviewer_email: reviewForm.reviewer_email.trim() || null,
          rating: reviewForm.rating,
          review_text: reviewForm.review_text.trim() || null
        }]);

      if (error) throw error;

      // Reset form and close modal
      setReviewForm({
        reviewer_name: '',
        reviewer_email: '',
        rating: 0,
        review_text: ''
      });
      setShowReviewModal(false);
      
      // Refresh reviews
      fetchReviews();
      
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitingReview(false);
    }
  };

  // Handle Click Actions with Tracking
  const handleWhatsAppClick = () => {
    if (business?.id) trackEvent(business.id, "whatsapp_click");
    if (business?.contact) {
      window.open(`https://wa.me/${business.contact.replace(/\D/g, "")}`, "_blank");
    }
  };

  const handleCallClick = () => {
    if (business?.id) trackEvent(business.id, "contact_click");
    if (business?.contact) {
      window.location.href = `tel:${business.contact}`;
    }
  };

  const handleEmailClick = () => {
    if (business?.id) trackEvent(business.id, "contact_click");
    if (business?.email) {
      window.location.href = `mailto:${business.email}`;
    }
  };

  const handleShare = () => {
    if (business?.id) trackEvent(business.id, "profile_share");
    if (navigator.share) {
      navigator.share({
        title: business?.business_name || "Business Profile",
        text: business?.business_description || "Check out this business profile",
        url: window.location.href,
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


  const getServices = () => {
    if (!business?.business_services) return [];
    if (typeof business.business_services === "string") {
      try {
        return JSON.parse(business.business_services);
      } catch {
        return business.business_services.split(",").map((s) => s.trim());
      }
    }
    return Array.isArray(business.business_services)
      ? business.business_services
      : [];
  };

  const getSocialMedia = () => {
    return {
      facebook: business?.facebook || null,
      twitter: business?.twitter || null,
      instagram: business?.instagram || null,
      linkedin: business?.linkedin || null,
    };
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const location = [business?.town, business?.region]
    .filter(Boolean)
    .join(", ");

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
              <h2 className="text-xl font-semibold mb-2">
                Error Loading Business
              </h2>
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
              <p className="text-gray-600">
                The business you're looking for doesn't exist or has been
                removed.
              </p>
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
      <div className={`max-w-6xl mx-auto my-10 bg-white rounded-3xl overflow-hidden ${className}`}>
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
                isFavorited ? "text-red-500" : "text-white hover:bg-opacity-30"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end space-x-4">
              <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-4 border-white border-opacity-30">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-1">
                  {business.business_name}
                </h1>
                <p className="text-lg opacity-90 mb-2">{business.industry}</p>
                <div className="flex items-center space-x-4 text-sm opacity-80">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{location}</span>
                  </div>
                  {reviewStats.totalReviews > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{reviewStats.averageRating}</span>
                      <span>({reviewStats.totalReviews} reviews)</span>
                    </div>
                  )}
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
                  {business.operating_hours || "Hours not specified"}
                </span>
              </div>
            </div>
            {business.employee_count && (
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {business.employee_count} employees
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={handleWhatsAppClick}
              disabled={!business.contact}
              className={`flex items-center justify-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                business.contact
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={handleCallClick}
              disabled={!business.contact}
              className={`flex items-center justify-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                business.contact
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">Call</span>
            </button>

            <button
              onClick={handleEmailClick}
              disabled={!business.email}
              className={`flex items-center justify-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                business.email
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Email</span>
            </button>

            <button
              onClick={() => setShowReviewModal(true)}
              className="flex items-center justify-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Review</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex flex-wrap justify-between px-4 sm:px-6 relative">
            {[
              { id: "overview", label: "Overview" },
              { id: "services", label: "Services" },
              { id: "reviews", label: `Reviews (${reviewStats.totalReviews})` },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-3 px-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 transition-all duration-300 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  About This Business
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {business.business_description ||
                    "No description available for this business."}
                </p>
              </div>

              {/* Reviews Preview */}
              {reviewStats.totalReviews > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>View all reviews</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          {reviewStats.averageRating}
                        </div>
                        <div className="flex justify-center mb-1">
                          {renderStars(Math.round(reviewStats.averageRating))}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reviewStats.totalReviews} reviews
                        </div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2 text-sm">
                            <span className="w-8">{rating}★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-yellow-400 rounded-full"
                                style={{
                                  width: `${reviewStats.totalReviews > 0 
                                    ? (reviewStats.ratingDistribution[rating] / reviewStats.totalReviews) * 100 
                                    : 0}%`
                                }}
                              ></div>
                            </div>
                            <span className="w-8 text-gray-600">
                              {reviewStats.ratingDistribution[rating]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{review.reviewer_name}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500">
                              {formatDate(review.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.review_text && (
                        <p className="text-gray-700 text-sm mt-2">{review.review_text}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Business Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Building className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Industry</p>
                        <p className="font-medium">
                          {business.industry || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">
                          {business.district || "Not specified"}
                        </p>
                      </div>
                    </div>
                    {business.employee_count && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Users className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Team Size</p>
                          <p className="font-medium">
                            {business.employee_count} employees
                          </p>
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

          {activeTab === "services" && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Our Services</h3>
              {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">
                            {service.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{service}</h4>
                          <p className="text-sm text-gray-600">
                            Professional {service.toLowerCase()} services
                          </p>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Services Listed
                  </h3>
                  <p className="text-gray-500">
                    This business hasn't added their services yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Review</span>
                </button>
              </div>

              {reviewStats.totalReviews > 0 ? (
                <>
                  {/* Review Statistics */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          {reviewStats.averageRating}
                        </div>
                        <div className="flex justify-center mb-2">
                          {renderStars(Math.round(reviewStats.averageRating))}
                        </div>
                        <div className="text-gray-600">
                          Based on {reviewStats.totalReviews} reviews
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-3">
                            <span className="text-sm font-medium w-6">{rating}</span>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <div className="flex-1 h-3 bg-gray-200 rounded-full">
                              <div
                                className="h-3 bg-yellow-400 rounded-full transition-all duration-500"
                                style={{
                                  width: `${reviewStats.totalReviews > 0 
                                    ? (reviewStats.ratingDistribution[rating] / reviewStats.totalReviews) * 100 
                                    : 0}%`
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {reviewStats.ratingDistribution[rating]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviewsLoading ? (
                      <div className="text-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                        <p className="text-gray-600">Loading reviews...</p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-semibold text-gray-900 text-lg">
                                {review.reviewer_name}
                              </div>
                              <div className="flex items-center space-x-3 mt-1">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-500">
                                  {formatDate(review.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {review.review_text && (
                            <p className="text-gray-700 leading-relaxed">
                              {review.review_text}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {reviews.length >= 3 && (
                    <div className="text-center">
                      <button
                        onClick={fetchReviews}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Load More Reviews
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Be the first to share your experience with this business.
                  </p>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Write First Review
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "contact" && (
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
                        <p className="text-gray-600">
                          {business.physical_address}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {business.district}, {business.region}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(socialMedia.facebook ||
                socialMedia.instagram ||
                socialMedia.twitter ||
                socialMedia.linkedin) && (
                <div>
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialMedia.facebook && (
                      <a
                        href={
                          socialMedia.facebook.startsWith("http")
                            ? socialMedia.facebook
                            : `https://facebook.com/${socialMedia.facebook}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                    )}
                    {socialMedia.instagram && (
                      <a
                        href={
                          socialMedia.instagram.startsWith("http")
                            ? socialMedia.instagram
                            : `https://instagram.com/${socialMedia.instagram}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    {socialMedia.twitter && (
                      <a
                        href={
                          socialMedia.twitter.startsWith("http")
                            ? socialMedia.twitter
                            : `https://twitter.com/${socialMedia.twitter}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors"
                      >
                        <Twitter className="w-6 h-6" />
                      </a>
                    )}
                    {socialMedia.linkedin && (
                      <a
                        href={
                          socialMedia.linkedin.startsWith("http")
                            ? socialMedia.linkedin
                            : `https://linkedin.com/in/${socialMedia.linkedin}`
                        }
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
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Write a Review</h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.reviewer_name}
                    onChange={(e) => setReviewForm({...reviewForm, reviewer_name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={reviewForm.reviewer_email}
                    onChange={(e) => setReviewForm({...reviewForm, reviewer_email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {renderStars(reviewForm.rating, true, (rating) => 
                      setReviewForm({...reviewForm, rating})
                    )}
                    <span className="text-sm text-gray-600 ml-2">
                      {reviewForm.rating > 0 ? `${reviewForm.rating} star${reviewForm.rating > 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review (optional)
                  </label>
                  <textarea
                    value={reviewForm.review_text}
                    onChange={(e) => setReviewForm({...reviewForm, review_text: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Share your experience with this business..."
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitingReview || !reviewForm.reviewer_name || !reviewForm.rating}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {submitingReview ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};