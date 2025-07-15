import React, { useState } from 'react';
import { 
  UserPlus, 
  Building2, 
  Edit3, 
  Eye, 
  Settings,
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  Play,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const HowItWorksPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const steps = [
    {
      number: 1,
      icon: <UserPlus className="w-8 h-8" />,
      title: "Create Your Account",
      description: "Sign up for free with just your email and phone number. No hidden fees or complex requirements."
    },
    {
      number: 2,
      icon: <Building2 className="w-8 h-8" />,
      title: "Register Your Business",
      description: "Add your business details including name, category, and location. We'll verify your information quickly."
    },
    {
      number: 3,
      icon: <Edit3 className="w-8 h-8" />,
      title: "Complete Your Profile",
      description: "Upload photos, add contact information, business hours, and services offered. The more details, the better!"
    },
    {
      number: 4,
      icon: <Eye className="w-8 h-8" />,
      title: "Get Discovered",
      description: "Your business becomes instantly searchable by customers looking for your services across Ghana."
    },
    {
      number: 5,
      icon: <Settings className="w-8 h-8" />,
      title: "Manage & Update",
      description: "Keep your information current and respond to customer inquiries through your dashboard."
    }
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Built for Everyone",
      description: "Simple interface designed for business owners of all technical levels"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Grow Your Reach",
      description: "Connect with customers across Ghana and increase your business visibility"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Platform",
      description: "Verified listings and secure platform built specifically for Ghanaian businesses"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to get my business listed?",
      answer: "Most businesses are approved and listed within 24 hours after completing their profile."
    },
    {
      question: "Is there a cost to register my business?",
      answer: "Basic registration is completely free. We offer premium features for businesses that want enhanced visibility."
    },
    {
      question: "Can I update my business information after registration?",
      answer: "Yes! You can update your business information, photos, and contact details anytime through your dashboard."
    },
    {
      question: "What types of businesses can register?",
      answer: "All legitimate businesses operating in Ghana can register, from small local shops to large enterprises."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-yellow-500 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              From sign-up to being discovered by customers — it's easy!
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm md:text-base">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                🇬🇭 Made for Ghana
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                ⚡ Quick Setup
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                🆓 Free to Start
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Started in 5 Simple Steps
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of Ghanaian businesses already using our platform to grow their customer base
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    index === 2 ? 'lg:col-span-1 lg:mx-auto' : ''
                  }`}
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                      {step.number}
                    </div>
                    <div className="text-green-600">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Use GBP Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Ghana Business Platform?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built specifically for Ghanaian businesses with features that matter most to local entrepreneurs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              See It in Action
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Watch how easy it is to get your business online and start attracting customers
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-dashed border-gray-200">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                  <Play className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Video Demo Coming Soon!
                </h3>
                <p className="text-gray-600 mb-8 max-w-md">
                  We're creating a detailed walkthrough video to show you exactly how to set up your business profile
                </p>
                <button className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Get Notified When Ready
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-8 md:p-12 border border-green-100">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6">
                  "Within one week of listing my tailoring business, I got 5 new customers! The platform is so easy to use, and customers can find me quickly."
                </blockquote>
                <div className="font-semibold text-gray-900">
                  Akosua Mensah
                </div>
                <div className="text-gray-600">
                  Owner, Akosua's Fashion House, Kumasi
                </div>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Got questions? We've got answers to help you get started
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join thousands of businesses already using Ghana Business Platform to grow their customer base
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Register Your Business
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
                Learn More
              </button>
            </div>
            <div className="mt-8 text-sm opacity-75">
              <p>🎉 Limited time: Free premium features for first 100 businesses!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default HowItWorksPage;