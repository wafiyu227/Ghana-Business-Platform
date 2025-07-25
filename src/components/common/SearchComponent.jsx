import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { supabase } from "../../supabaseClient";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "All Categories",
    "Agriculture",
    "Manufacturing",
    "Construction",
    "Retail & Wholesale",
    "Restaurants & Food",
    "Technology",
    "Healthcare",
    "Education",
    "Financial Services",
    "Transportation",
    "Tourism & Hospitality",
    "Real Estate",
    "Professional Services",
    "Entertainment",
    "Health & Beauty",
  ];

  const locations = [
    "All Locations",
    "Accra",
    "Tema",
    "Kasoa",
    "Madina",
    "Ashaiman",
    "Cape Coast",
    "Takoradi",
    "Sekondi",
    "Elmina",
    "Winneba",
    "Kumasi",
    "Obuasi",
    "Ejisu",
    "Sunyani",
    "Berekum",
    "Techiman",
    "Kintampo",
    "Goaso",
    "Tamale",
    "Yendi",
    "Savelugu",
    "Gushegu",
    "Wa",
    "Tumu",
    "Nandom",
    "Lawra",
    "Bolgatanga",
    "Navrongo",
    "Bawku",
    "Zebilla",
    "Ho",
    "Hohoe",
    "Kpando",
    "Keta",
    "Sogakope",
    "Denu",
    "Koforidua",
    "Nkawkaw",
    "Suhum",
    "Akim Oda",
    "Begoro",
    "Donkorkrom",
    "Dambai",
    "Nkwanta",
    "Jasikan",
    "Salaga",
    "Damongo",
    "Buipe",
    "Bole",
  ];

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      let { data, error } = await supabase.from("businesses").select("*");

      if (searchQuery.trim() !== "") {
        query = query.ilike("name", `%${searchQuery.trim()}%`);
      }

      if (location && location !== "All Locations") {
        query = query.ilike("location", `%${location}%`);
      }

      if (category && category !== "All Categories") {
        query = query.eq("category", category);
      }

      if (error) {
        setError("Failed to fetch businesses.");
        console.error("Search error:", error);
      } else {
        setSearchResults(data || []);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gradient-to-r from-blue-50 to-gray-50 py-8"
      id="findBusinesses"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Find Local Businesses
          </h2>
          <p className="text-gray-600">
            Discover amazing businesses in your area
          </p>
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
              <input
                list="location-options"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Type or select a location"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />

              <datalist id="location-options">
                {locations.map((loc, index) => (
                  <option key={index} value={loc} />
                ))}
              </datalist>
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5" />
              <span>{loading ? "Searching..." : "Search Businesses"}</span>
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Restaurants",
                "Hair Salons",
                "Mechanic",
                "Pharmacy",
                "Schools",
              ].map((term, index) => (
                <span
                  key={index}
                  className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors border border-gray-200"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && searchResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {searchResults.map((biz) => (
                  <div
                    key={biz.id}
                    className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
                  >
                    <h3 className="font-bold text-lg text-blue-800">
                      {biz.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{biz.category}</p>
                    <p className="text-gray-500 text-sm">{biz.location}</p>
                  </div>
                ))}
              </div>
            )}

            {!loading && searchResults.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                No businesses found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
