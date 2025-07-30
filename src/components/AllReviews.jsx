import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Star, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';

const AllReviews = ({ businessId, businessName }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  const reviewsPerPage = 10;

  useEffect(() => {
    if (businessId) {
      fetchReviews();
      fetchReviewStats();
    }
  }, [businessId, currentPage, filterRating, sortBy]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('business_id', businessId);

      // Apply rating filter
      if (filterRating !== 'all') {
        query = query.eq('rating', parseInt(filterRating));
      }

      // Apply sorting
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true });
      } else if (sortBy === 'highest') {
        query = query.order('rating', { ascending: false });
      } else if (sortBy === 'lowest') {
        query = query.order('rating', { ascending: true });
      }

      // Apply pagination
      const from = (currentPage - 1) * reviewsPerPage;
      const to = from + reviewsPerPage - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setReviews(data || []);
      setTotalPages(Math.ceil(count / reviewsPerPage));
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewStats = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('business_id', businessId);

      if (error) throw error;

      if (data && data.length > 0) {
        const totalReviews = data.length;
        const averageRating = data.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
        
        const ratingDistribution = data.reduce((acc, review) => {
          acc[review.rating] = (acc[review.rating] || 0) + 1;
          return acc;
        }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

        setReviewStats({
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews,
          ratingDistribution
        });
      }
    } catch (err) {
      console.error('Error fetching review stats:', err);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (rating) => {
    setFilterRating(rating);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reviews for {businessName}
        </h1>
        <p className="text-gray-600">
          {reviewStats.totalReviews} customer reviews
        </p>
      </div>

      {/* Review Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-3">
              {reviewStats.averageRating}
            </div>
            <div className="flex justify-center mb-3">
              {renderStars(Math.round(reviewStats.averageRating))}
            </div>
            <div className="text-gray-600">
              Based on {reviewStats.totalReviews} reviews
            </div>
          </div>
          
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <button
                  onClick={() => handleFilterChange(rating.toString())}
                  className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded transition-colors"
                >
                  <span className="text-sm font-medium w-3">{rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </button>
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

      {/* Filters and Sorting */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
            </div>
            <select
              value={filterRating}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest rating</option>
              <option value="lowest">Lowest rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {review.reviewer_name}
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      {renderStars(review.rating)}
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(review.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {review.review_text && (
                <div className="ml-15">
                  <p className="text-gray-700 leading-relaxed">
                    {review.review_text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Reviews Found
          </h3>
          <p className="text-gray-500">
            {filterRating !== 'all' 
              ? `No ${filterRating}-star reviews found.`
              : 'This business has no reviews yet.'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllReviews;