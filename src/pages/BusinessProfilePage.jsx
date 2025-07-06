import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // ✅ adjust path if needed
import { BusinessProfile } from '../pages/BusinessProfile'; // ✅ adjust path if needed

const BusinessProfilePage = () => {
  const { id } = useParams(); // gets the ID from the URL
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Business not found.');
        console.error(error);
      } else {
        setBusiness(data);
      }

      setLoading(false);
    };

    fetchBusiness();
  }, [id]);

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error || !business) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <BusinessProfile 
        business={business}
        onShare={(biz) => console.log('Shared:', biz)}
        onFavorite={(biz) => console.log('Favorited:', biz)}
      />
    </div>
  );
};

export default BusinessProfilePage;
