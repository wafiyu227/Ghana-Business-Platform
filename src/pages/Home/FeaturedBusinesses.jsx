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
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBusinesses(data);
      } catch (err) {
        setError('Failed to load businesses. Please try again.');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Featured Businesses
        </h2>

        {loading && <p className="text-center text-gray-500">Loading businesses...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {businesses.map((business) => (
    <div
      key={business.id}
      className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.02]"
    >
      {/* Business Name and Industry */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-blue-800 mb-1">
          {business.business_name}
        </h3>
        {business.industry && (
          <span className="inline-block text-sm text-white bg-blue-500 rounded-full px-3 py-1 font-medium">
            {business.industry}
          </span>
        )}
      </div>

      {/* Location */}
      {(business.physical_address || business.region) && (
        <div className="text-gray-700 text-sm mb-4 flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-[2px] text-gray-500" />
          <div>
            {business.physical_address && (
              <p>{business.physical_address}</p>
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
          <Users className="w-4 h-4 mr-2 text-blue-500" />
          {business.employee_count} employees
        </p>
      )}

      {/* CTA Buttons */}
      <div className="flex gap-3 mb-4">
        {business.contact && (
          <>
            <a
              href={`https://wa.me/${business.contact.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${business.contact}`}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          </>
        )}
      </div>

      {/* View Profile */}
      <Link
        to={`/business/${business.business_name}`}
        className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors duration-200"
      >
        View Full Profile <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default FeaturedBusinesses;
