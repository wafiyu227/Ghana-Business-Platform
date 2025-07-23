import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Update path as needed
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Users, ExternalLink } from 'lucide-react';

const FeaturedBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // First, try to fetch with anon key (public access)
        let { data, error } = await supabase
          .from('businesses')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4); // Limit to 4 businesses as requested

        // If RLS is blocking, try with service role or disable RLS temporarily
        if (error && error.code === 'PGRST116') {
          console.warn('RLS might be blocking public access. Trying alternative approach...');
          
          // Alternative: Create a public view or stored procedure
          // For now, we'll try to fetch without RLS restrictions
          const { data: publicData, error: publicError } = await supabase
            .rpc('get_featured_businesses', { limit_count: 4 });
          
          if (publicError) {
            throw publicError;
          }
          data = publicData;
        } else if (error) {
          throw error;
        }

        setBusinesses(data || []);
      } catch (err) {
        setError('Failed to load businesses. Please try again.');
        console.error('Error fetching businesses:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Businesses
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-500">Loading businesses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Businesses
          </h2>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Featured Businesses
        </h2>

        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No businesses found at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for featured businesses!</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.02] hover:shadow-xl"
              >
                {/* Business Name and Industry */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-blue-800 mb-2 line-clamp-2">
                    {business.business_name}
                  </h3>
                  {business.industry && (
                    <span className="inline-block text-xs text-white bg-blue-500 rounded-full px-3 py-1 font-medium">
                      {business.industry}
                    </span>
                  )}
                </div>

                {/* Location */}
                {(business.physical_address || business.region) && (
                  <div className="text-gray-700 text-sm mb-4 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-[2px] text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      {business.physical_address && (
                        <p className="line-clamp-2">{business.physical_address}</p>
                      )}
                      {business.region && (
                        <p className="text-gray-500">{business.region} Region</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Employee Count */}
                {business.employee_count && (
                  <p className="text-gray-600 text-sm flex items-center mb-4">
                    <Users className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    {business.employee_count} employees
                  </p>
                )}

                {/* CTA Buttons */}
                {business.contact && (
                  <div className="flex gap-2 mb-4">
                    <a
                      href={`https://wa.me/${business.contact.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${business.contact}`}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </a>
                  </div>
                )}

                {/* View Profile */}
                <Link
                  to={`/business/${business.business_name}`}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors duration-200 text-sm"
                >
                  View Profile <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBusinesses;