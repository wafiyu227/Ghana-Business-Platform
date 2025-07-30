import React, { useState } from 'react';
import { Check, Star, TrendingUp, BarChart3, Share2 } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const scrollToPricing = () => {
    document.getElementById('pricing-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect to get started',
      features: [
        'Basic business listing',
        '3 product photos',
        'Contact information display',
        'Search visibility',
        'Mobile-friendly profile'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Basic',
      price: isAnnual ? 500 : 50,
      period: isAnnual ? 'year' : 'month',
      description: 'Boost your visibility',
      features: [
        'Everything in Free',
        'Featured in search results',
        '10 product photos',
        'Customer reviews & ratings',
        'WhatsApp integration',
        'Social media links',
        'Priority customer support'
      ],
      cta: 'Choose Basic',
      popular: true,
      color: 'border-green-500 ring-2 ring-green-200'
    },
    {
      name: 'Standard',
      price: isAnnual ? 1000 : 100,
      period: isAnnual ? 'year' : 'month',
      description: 'Grow your customer base',
      features: [
        'Everything in Basic',
        'Homepage featured listing',
        'Unlimited product photos',
        'Advanced analytics dashboard',
        'Lead generation tools',
        'Email marketing integration',
        'Custom business page design'
      ],
      cta: 'Choose Standard',
      popular: false,
      color: 'border-yellow-400'
    },
    {
      name: 'Pro',
      price: isAnnual ? 2000 : 200,
      period: isAnnual ? 'year' : 'month',
      description: 'Maximum growth potential',
      features: [
        'Everything in Standard',
        'Top banner placement',
        'Social media promotion',
        'SEO optimization',
        'Dedicated account manager',
        'Custom integrations',
        'Priority feature requests'
      ],
      cta: 'Choose Pro',
      popular: false,
      color: 'border-yellow-600'
    }
  ];

  const features = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Featured Listings',
      description: 'Get your business noticed with premium placement in search results and category pages. Stand out from competitors and attract more customers.'
    },
    {
      icon: <Share2 className="w-8 h-8 text-green-600" />,
      title: 'Social Media Promotion',
      description: 'Amplify your reach with our social media marketing. Your business gets featured across our social channels to thousands of potential customers.'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: 'Analytics & Leads',
      description: 'Track your performance with detailed analytics. See who\'s viewing your business, get customer leads, and make data-driven decisions.'
    }
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-600/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Join 500+ Ghanaian Businesses Growing Online
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Business Deserves to Be 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600"> Seen!</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of Ghanaian businesses getting more customers online. Upgrade today and get the visibility you need.
          </p>
          
          <button 
            onClick={scrollToPricing}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
            <TrendingUp className="ml-2 w-5 h-5" />
          </button>
          
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Active Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">50K+</div>
              <div className="text-gray-600">Monthly Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Growth Plan
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start free and upgrade as you grow. All plans include our core features.
            </p>
            
            {/* Annual/Monthly Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-xl p-1">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${!isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
              >
                Annual
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Save 15%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${plan.color} ${plan.popular ? 'scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      GHS {plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                    {isAnnual && plan.price > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save GHS {((plan.price / 10 * 12) - plan.price).toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Upgrade Your Business?
            </h2>
            <p className="text-xl text-gray-600">
              Premium features that drive real results for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Don't let your competitors get ahead. Join the fastest-growing business platform in Ghana and start getting more customers today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Upgrade Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-700 transition-all duration-300">
              Talk to Sales
            </button>
          </div>
          
          <div className="mt-8 text-green-100">
            <p>✓ 30-day money-back guarantee  ✓ No setup fees  ✓ Cancel anytime</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default PricingPage;