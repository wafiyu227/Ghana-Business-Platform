import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'All Categories',
    'Restaurants & Food',
    'Retail & Shopping',
    'Professional Services',
    'Health & Beauty',
    'Technology',
    'Construction',
    'Education',
    'Transportation',
    'Entertainment'
  ];

  const locations = [
    'All Locations',
    'Accra',
    'Kumasi',
    'Tamale',
    'Cape Coast',
    'Ho',
    'Koforidua',
    'Sunyani',
    'Wa',
    'Bolgatanga'
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Local Businesses</h2>
          <p className="text-gray-600">Discover amazing businesses in your area</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location Select */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Businesses</span>
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Restaurants', 'Hair Salons', 'Mechanic', 'Pharmacy', 'Schools'].map((term, index) => (
                <span
                  key={index}
                  className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors border border-gray-200"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;