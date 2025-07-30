import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'

const PricingComponent = ({ showHeader = true, maxPlans = 4 }) => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect to get started',
      features: [
        'Basic business listing',
        '3 product photos',
        'Contact information',
        'Search visibility'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'border-gray-200',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'Basic',
      price: 100,
      period: 'month',
      description: 'Boost your visibility',
      features: [
        'Everything in Free',
        'Featured in search',
        '10 product photos',
        'Customer reviews',
        'WhatsApp integration'
      ],
      cta: 'Choose Basic',
      popular: true,
      color: 'border-green-500 ring-2 ring-green-200',
      textColor: 'text-white',
      bgColor: 'bg-gradient-to-br from-green-600 to-green-700'
    },
    {
      name: 'Standard',
      price: 200,
      period: 'month',
      description: 'Grow your customer base',
      features: [
        'Everything in Basic',
        'Homepage featured',
        'Unlimited photos',
        'Analytics dashboard',
        'Lead generation'
      ],
      cta: 'Choose Standard',
      popular: false,
      color: 'border-yellow-400',
      textColor: 'text-gray-700',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Pro',
      price: 400,
      period: 'month',
      description: 'Maximum growth',
      features: [
        'Everything in Standard',
        'Top banner placement',
        'Social media promotion',
        'SEO optimization',
        'Account manager'
      ],
      cta: 'Choose Pro',
      popular: false,
      color: 'border-yellow-600',
      textColor: 'text-gray-700',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100'
    }
  ];

  const displayedPlans = plans.slice(0, maxPlans);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50/50 via-white to-yellow-50/50">
      <div className="max-w-6xl mx-auto">
        {showHeader && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-1" />
              Pricing Plans
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Choose Your Growth Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. Join hundreds of businesses already growing with us.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPlans.map((plan, index) => (
            <div key={index} className={`relative ${plan.bgColor} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${plan.color} ${plan.popular ? 'scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className={`text-xl font-bold mb-1 ${plan.textColor}`}>{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? 'text-green-100' : 'text-gray-600'} mb-3`}>{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className={`text-3xl font-bold ${plan.textColor}`}>
                      GHS {plan.price.toLocaleString()}
                    </span>
                    <span className={`text-sm ml-1 ${plan.popular ? 'text-green-100' : 'text-gray-600'}`}>/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
                      <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-green-200' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-green-50' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-white text-green-700 hover:bg-gray-100 shadow-md hover:shadow-lg' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}>
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link to="/pricing">
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Features
            </button>
            </Link>
            <button className="px-6 py-3 border-2 border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300">
              Contact Sales
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            ✓ 30-day money-back guarantee  ✓ No setup fees  ✓ Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;