import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Users, Award, TrendingUp, CheckCircle } from 'lucide-react';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.mission-card', 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.mission-section',
            start: "top 80%",
          }
        }
      );

      gsap.fromTo('.team-member', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.team-section',
            start: "top 80%",
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={aboutRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">About Wealth Genius</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Founded with a mission to democratize trading education, Wealth Genius has been empowering individuals 
              to take control of their financial future through comprehensive market education and practical training.
            </p>
            <div className="flex justify-center">
              <div className="bg-blue-600 p-4 rounded-full">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Wealth Genius was born from the vision of making professional-level trading education accessible to everyone. 
                Our founder, a former Wall Street trader, recognized the gap between theoretical knowledge and practical 
                application in traditional financial education.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Over the past decade, we've refined our teaching methodology, combining time-tested trading principles 
                with cutting-edge market analysis techniques. Our approach focuses on building not just technical skills, 
                but also the psychological discipline required for successful trading.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Established in 2024</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Over 500 successful graduates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">95% student satisfaction rate</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-100 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="font-bold text-gray-800 mb-4">Our Mission</h3>
                  <p className="text-gray-600 text-sm">
                    To provide world-class trading education that transforms lives and builds lasting financial success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600">Guiding principles that drive everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mission-card bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize financial markets education by providing accessible, practical, and comprehensive 
                trading programs that empower individuals to achieve financial independence.
              </p>
            </div>

            <div className="mission-card bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the world's leading trading education platform, known for producing confident, 
                successful traders who make informed decisions and achieve consistent profitability.
              </p>
            </div>

            <div className="mission-card bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Integrity, excellence, and student success guide every decision we make. We believe in 
                transparency, continuous learning, and building lasting relationships with our students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">Seasoned professionals with decades of combined market experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="team-member text-center">
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                <img 
                  src="/images/nainesh-patel.png" 
                  alt="Nainesh Patel - Founder & CEO"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{display: 'none'}}>
                  NP
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Nainesh Patel</h3>
              <p className="text-blue-600 font-semibold mb-4">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Former Wall Street trader with 5+ years of experience. Specialized in day trading 
                and options strategies with a proven track record of consistent profitability.
              </p>
            </div>

            <div className="team-member text-center">
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                <img 
                  src="/images/kaushal-patel.png" 
                  alt="Kaushal Patel - Head of Curriculum"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{display: 'none'}}>
                  KP
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Kaushal Patel</h3>
              <p className="text-blue-600 font-semibold mb-4">Head of Curriculum</p>
              <p className="text-gray-600 text-sm">
                CFA charterholder and former hedge fund manager. Expert in fundamental analysis 
                and long-term investment strategies with over 5 years of market experience.
              </p>
            </div>


          </div>
        </div>
      </section>
    </div>
  );
};

export default About;