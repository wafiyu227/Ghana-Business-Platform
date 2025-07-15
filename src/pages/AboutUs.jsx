import React, { useState } from 'react';
import { 
  Heart, 
  Target, 
  Users, 
  Zap,
  Globe,
  Shield,
  MapPin,
  Star,
  ChevronRight,
  Mail,
  Phone,
  Building,
  TrendingUp,
  Clock,
  CheckCircle,
  Quote
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const AboutUsPage = () => {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Accessibility",
      description: "Every business owner, regardless of technical skills, should be able to get online easily and affordably."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Simplicity",
      description: "We believe in keeping things simple, intuitive, and focused on what matters most to local businesses."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Empowerment",
      description: "Our platform empowers business owners to take control of their online presence and grow their customer base."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local-First",
      description: "Built specifically for Ghana, understanding local business culture, needs, and challenges."
    }
  ];

  const features = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Free Business Registration",
      description: "Get your business listed at no cost with our easy registration process"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Enhanced Discoverability",
      description: "Be found by customers searching for your services across Ghana"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Listings",
      description: "Build customer trust with verified business profiles and reviews"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Tools",
      description: "Analytics and insights to help you understand and grow your customer base"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-Time Updates",
      description: "Keep your business information current with instant profile updates"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Mobile-Friendly",
      description: "Manage your business on the go with our responsive mobile experience"
    }
  ];

  const teamMembers = [
    {
      name: "Coming Soon",
      role: "Founder & CEO",
      bio: "Passionate about supporting local businesses",
      image: "👤"
    },
    {
      name: "Coming Soon",
      role: "Co-Founder & CTO",
      bio: "Building technology that makes a difference",
      image: "👤"
    },
    {
      name: "Coming Soon",
      role: "Head of Operations",
      bio: "Ensuring smooth experiences for all users",
      image: "👤"
    }
  ];

  const stats = [
    { number: "1000+", label: "Businesses Listed", icon: <Building className="w-5 h-5" /> },
    { number: "50+", label: "Cities Covered", icon: <MapPin className="w-5 h-5" /> },
    { number: "10K+", label: "Monthly Visitors", icon: <Users className="w-5 h-5" /> },
    { number: "98%", label: "Customer Satisfaction", icon: <Star className="w-5 h-5" /> }
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Ghana Business Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Empowering Ghanaian businesses to thrive online
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                🇬🇭 Made in Ghana
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                🤝 For Ghanaian Businesses
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                🚀 Built for Growth
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-center mb-3 text-green-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-8 md:p-12 border border-green-100">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                To make it easy for local businesses in Ghana to gain online visibility, grow their customer base, and operate more efficiently through modern, accessible tools designed specifically for the Ghanaian market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-gray-700">
                  <p>
                    We noticed something troubling: many amazing Ghanaian businesses were practically invisible online. From the talented seamstress in Osu to the innovative tech repair shop in Kumasi, countless businesses were missing out on customers simply because they couldn't be found.
                  </p>
                  <p>
                    At the same time, customers were struggling too. Finding verified, reliable local businesses required word-of-mouth recommendations or driving around neighborhoods hoping to stumble upon what they needed.
                  </p>
                  <p>
                    That's when we decided to build something different. Ghana Business Platform isn't just another directory – it's a bridge connecting hardworking business owners with the customers who need their services, built specifically for the Ghanaian market.
                  </p>
                </div>
                <div className="mt-8 p-6 bg-white rounded-lg border-l-4 border-green-500">
                  <Quote className="w-8 h-8 text-green-600 mb-4" />
                  <p className="text-gray-700 italic">
                    "Every business deserves to be discovered. Every customer deserves to find exactly what they're looking for. We're here to make that happen."
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">The Problem</h3>
                      <p className="text-gray-600">Local businesses struggling with online visibility</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">The Vision</h3>
                      <p className="text-gray-600">A platform that connects businesses with customers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">The Solution</h3>
                      <p className="text-gray-600">Ghana Business Platform was born</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to establish and grow your online presence, designed specifically for Ghanaian businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 group-hover:bg-green-200 rounded-lg w-12 h-12 flex items-center justify-center mr-4 transition-colors duration-300">
                      <div className="text-green-600">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do and every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeValue === index
                      ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg'
                      : 'bg-white text-gray-900 hover:shadow-md'
                  }`}
                  onClick={() => setActiveValue(index)}
                >
                  <div className="flex items-center mb-4">
                    <div className={`rounded-lg w-16 h-16 flex items-center justify-center mr-6 ${
                      activeValue === index
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-semibold">
                      {value.title}
                    </h3>
                  </div>
                  <p className={`text-lg leading-relaxed ${
                    activeValue === index ? 'text-white opacity-90' : 'text-gray-600'
                  }`}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet the Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The passionate individuals working to empower Ghanaian businesses
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                We're growing! Interested in joining our mission?
              </p>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Future Features Placeholder */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 md:p-12 border-2 border-dashed border-gray-200">
              <div className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Testimonials & Press Coming Soon
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We're collecting stories from satisfied business owners and working with local media to share our impact on Ghana's business community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Want to put your business on the map?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              It's free and takes just a few minutes to get started
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                Get Started Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </div>
            <div className="mt-8 text-sm opacity-75">
              <p>✨ Join over 1,000 businesses already using our platform</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutUsPage;