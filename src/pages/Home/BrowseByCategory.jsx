import React from 'react';
import { Link } from 'react-router-dom';

const BrowseByCategory = () => {
  const categories = [
    {
      id: 'restaurants',
      name: 'Restaurants',
      count: 1250,
      icon: '🍴',
      bgColor: 'bg-orange-100',
      link: '/category/restaurants'
    },
    {
      id: 'shops',
      name: 'Shops',
      count: 890,
      icon: '🛒',
      bgColor: 'bg-blue-100',
      link: '/category/shops'
    },
    {
      id: 'services',
      name: 'Services',
      count: 670,
      icon: '🔧',
      bgColor: 'bg-green-100',
      link: '/category/services'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      count: 340,
      icon: '❤️',
      bgColor: 'bg-red-100',
      link: '/category/healthcare'
    },
    {
      id: 'education',
      name: 'Education',
      count: 280,
      icon: '🎓',
      bgColor: 'bg-purple-100',
      link: '/category/education'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      count: 190,
      icon: '🚗',
      bgColor: 'bg-gray-100',
      link: '/category/automotive'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      count: 150,
      icon: '🏠',
      bgColor: 'bg-yellow-100',
      link: '/category/real-estate'
    },
    {
      id: 'professional',
      name: 'Professional',
      count: 120,
      icon: '💼',
      bgColor: 'bg-indigo-100',
      link: '/category/professional'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore businesses across different industries
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>

                {/* Business Count */}
                <p className="text-gray-500 text-sm">
                  {category.count.toLocaleString()} businesses
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;