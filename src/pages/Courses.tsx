import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Clock, Users, Star, CheckCircle, TrendingUp, BarChart, PieChart, X } from 'lucide-react';

const Courses = () => {
  const coursesRef = useRef(null);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: '',
    course: 'Stock Market Mastery Program'
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.courses-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.course-card', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.courses-grid',
            start: "top 80%",
          }
        }
      );

      gsap.fromTo('.feature-item', 
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.features-section',
            start: "top 80%",
          }
        }
      );
    }, coursesRef);

    return () => ctx.revert();
  }, []);

  const handleEnrollClick = () => {
    setShowEnrollmentForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { api } = await import('../services/api');
      
      // Map course name to price
      const coursePrices = {
        'Stock Market Fundamentals': '₹15,000',
        'Technical + Derivatives Mastery': '₹20,000', 
        'Stock Market Mastery Program': '₹35,000'
      };

      const result = await api.enrollment.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        course_title: formData.course,
        course_price: coursePrices[formData.course as keyof typeof coursePrices] || '₹15,000'
      });

      if (result.success) {
        alert(result.message || 'Thank you for your enrollment! We will contact you within 24 hours.');
        setShowEnrollmentForm(false);
        setFormData({ name: '', city: '', phone: '', email: '', course: 'Stock Market Mastery Program' });
      } else {
        alert(`Error: ${result.message || 'Failed to submit enrollment'}`);
      }
    } catch (error: any) {
      console.error('Error submitting enrollment:', error);
      alert(`Failed to submit enrollment: ${error.message || 'Please try again.'}`);
    }
  };

  const closeModal = () => {
    setShowEnrollmentForm(false);
    setFormData({ name: '', city: '', phone: '', email: '', course: 'Stock Market Mastery Program' });
  };

  const courses = [
    {
      title: "📈 Stock Market Mastery Program",
      level: "Complete Program",
      duration: "3 Months",
      students: 500,
      rating: 4.9,
      price: "₹35,000",
      icon: <TrendingUp className="h-8 w-8" />,
      description: "Complete learning path from basics to advanced trading with mentorship & certification. Beginner to Expert in 3 Months — 6 hrs/week",
      features: [
        "Level 01: Beginner (1 Month - ₹15,000)",
        "Level 02: Expert (2 Months - ₹20,000)",
        "Live trading sessions & mentorship",
        "Lifetime community access"
      ],
      levels: [
        {
          title: "🟢 Level 01: Stock Market Fundamentals",
          duration: "1 Month",
          schedule: "6 hrs/week",
          fee: "₹15,000",
          chapters: [
            {
              title: "📍 CHAPTER 01 — Basics of Stock Market",
              topics: [
                "Introduction to the stock market",
                "Segments of the stock market",
                "Pre-opening market sessions",
                "How the stock market works & its history",
                "Types of traders and trading styles",
                "IPOs: process & risks involved",
                "Investment planning & capital protection",
                "Risk and money management",
                "Trading psychology & trader mindset",
                "Charting software introduction",
                "Position sizing and its importance"
              ]
            },
            {
              title: "📍 CHAPTER 02 — Technical Analysis",
              topics: [
                "Basics of technical analysis & chart construction",
                "Candlestick patterns and trading strategies",
                "Trendlines, chart patterns & trend analysis",
                "Market cycles & Elliott waves (1st, 3rd, 5th)",
                "Dow Theory",
                "Fibonacci tools (retracements & breakout confirmation)",
                "Sector & index analysis",
                "Identifying bottom stocks and index levels",
                "Building a long-term portfolio"
              ]
            }
          ]
        },
        {
          title: "🔴 Level 02: Technical + Derivatives Mastery",
          duration: "2 Months",
          schedule: "6 hrs/week",
          fee: "₹20,000",
          chapters: [
            {
              title: "📍 CHAPTER 03 — Hybrid Technical Analysis & Tools",
              topics: [
                "Fibonacci sequence, support & resistance levels",
                "Nifty 100/200/500 setups",
                "Pivot point trading, pullback & throwback strategies",
                "Sectoral trend trading",
                "Divergence setups, impulsive & corrective waves",
                "Ichimoku cloud indicator",
                "Multiple time frame analysis",
                "Stock selection process"
              ]
            },
            {
              title: "📍 CHAPTER 04 — Rising with Derivatives",
              topics: [
                "Introduction & history of financial derivatives",
                "Futures & forward contracts",
                "Hedging, arbitrage & speculation",
                "Options market & Greeks (Delta, Gamma, Theta, Vega)",
                "Call vs Put, ATM/ITM/OTM, strike price selection",
                "Option chain reading",
                "Price action strategies for index trading",
                "Gap-up & gap-down strategies",
                "MCX commodities trading (gold, silver, crude, natural gas)",
                "Intraday live trading sessions"
              ]
            },
            {
              title: "📍 CHAPTER 05 — Practice, Backtesting & Certification",
              topics: [
                "Creating trading plans & checklists",
                "Strategy practice (live & post-market)",
                "Doubt-solving & revision sessions",
                "Lifetime mentorship & support"
              ]
            }
          ]
        }
      ]
    }
  ];

  const levelColors: { [key: string]: string } = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800',
    'Complete Program': 'bg-blue-100 text-blue-800'
  };

  return (
    <div ref={coursesRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="courses-hero text-center max-w-5xl mx-auto">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-white/90 text-sm font-medium">Professional Trading Education</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
              Master <span className="text-blue-300">Stock Market</span>
              <br />Trading Excellence
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-12 max-w-3xl mx-auto">
              Transform your financial future with our comprehensive trading education program. 
              Learn from industry experts and join thousands of successful traders.
            </p>
            <div className="flex justify-center space-x-12 text-white/80">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-grid py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Featured Program
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Trading Mastery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our flagship program designed to take you from beginner to expert trader in just 3 months
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            {courses.map((course, index) => (
              <div key={index} className="course-card bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Course Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl text-white">
                      {course.icon}
                    </div>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold mb-4">{course.title}</h3>
                  <p className="text-blue-100 text-lg leading-relaxed mb-6">{course.description}</p>
                  
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{course.duration}</div>
                      <div className="text-blue-200 text-sm">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{course.price}</div>
                      <div className="text-blue-200 text-sm">Total Fee</div>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-8">
                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">What You'll Get</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {course.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Levels Detail */}
                  {course.levels && (
                    <div className="space-y-8">
                      <h4 className="text-2xl font-bold text-gray-900 mb-6">Complete Curriculum</h4>
                      {course.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                          <div className="flex items-center justify-between mb-6">
                            <h5 className="text-2xl font-bold text-gray-900">{level.title}</h5>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">{level.fee}</div>
                              <div className="text-sm text-gray-500">{level.duration} • {level.schedule}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {level.chapters.map((chapter, chapterIndex) => (
                              <div key={chapterIndex} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                <h6 className="font-bold text-gray-800 mb-4 text-lg border-l-4 border-blue-500 pl-4">{chapter.title}</h6>
                                <ul className="space-y-2">
                                  {chapter.topics.map((topic, topicIndex) => (
                                    <li key={topicIndex} className="text-gray-600 text-sm flex items-start group hover:text-gray-800 transition-colors">
                                      <span className="text-blue-500 mr-3 mt-1 group-hover:text-blue-600 transition-colors">•</span>
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Section */}
                <div className="bg-gray-50 p-8 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to Start Your Trading Journey?</h4>
                      <p className="text-gray-600">Join hundreds of successful traders who started with Wealth Genius</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={handleEnrollClick}
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Enroll Now
                      </button>
                      <button 
                        onClick={() => window.open('tel:+919408611281', '_self')}
                        className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="features-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Premium Learning Experience
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every course includes premium features designed for maximum learning success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-item text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Interactive Sessions</h3>
              <p className="text-gray-600">Real-time classes with expert instructors and Q&A sessions</p>
            </div>

            <div className="feature-item text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusive Community</h3>
              <p className="text-gray-600">Join our premium trading community with lifetime access</p>
            </div>

            <div className="feature-item text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Trading Platform</h3>
              <p className="text-gray-600">Practice with real market data in our advanced simulator</p>
            </div>

            <div className="feature-item text-center group">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Certification</h3>
              <p className="text-gray-600">Industry-recognized certificate upon completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md my-4 sm:my-8 mx-2 sm:mx-auto">
            <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-white z-10 pb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Enroll Now</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Fill out the form below to start your trading journey</p>

              {/* Enrollment Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-base"
                    required
                  >
                    <option value="Stock Market Fundamentals">Stock Market Fundamentals</option>
                    <option value="Technical + Derivatives Mastery">Technical + Derivatives Mastery</option>
                    <option value="Stock Market Mastery Program">Stock Market Mastery Program</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Submit Enrollment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;