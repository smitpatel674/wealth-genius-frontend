import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import ScheduleModal from '../components/ScheduleModal';

const Contact = () => {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  
  // Schedule modal state
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.contact-card', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.contact-info',
            start: "top 80%",
          }
        }
      );

      gsap.fromTo('.form-field', 
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-form',
            start: "top 80%",
          }
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { api } = await import('../services/api');
      
      const result = await api.contact.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.course ? `Inquiry about ${formData.course}` : 'General Inquiry',
        message: formData.message,
        course: formData.course
      });

      if (result.success) {
        alert(result.message || 'Thank you for contacting us! We will get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          message: ''
        });
      } else {
        alert(`Error: ${result.message || 'Failed to submit contact form'}`);
      }
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      alert(`Failed to submit contact form: ${error.message || 'Please try again.'}`);
    }
  };

  return (
    <div ref={contactRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="contact-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Ready to start your trading journey? Have questions about our courses? 
              We're here to help you take the next step towards financial success.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="contact-card text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak with our education consultants</p>
              <a href="tel:+15551234567" className="text-blue-600 font-semibold hover:text-blue-700">
                +91 96245 18383              </a>
              <p className="text-sm text-gray-500 mt-1">Mon-Fri 9AM-6PM EST</p>
            </div>

            <div className="contact-card text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Get detailed information about courses</p>
              <a href="mailto:info@wealthgenius.com" className="text-blue-600 font-semibold hover:text-blue-700">
                info@wealthgenius.com
              </a>
              <p className="text-sm text-gray-500 mt-1">24-48 hour response time</p>
            </div>

            <div className="contact-card text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Come for a campus tour</p>
              <a 
                href="https://maps.app.goo.gl/417qktSTh8WfSNCu8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                <address className="not-italic">
                  409/ Golden Square, Near,<br />
                  Kalyan Chowk, Nikol<br />
                  Ahmedabad, Gujarat - 382350
                </address>
              </a>
            </div>

            <div className="contact-card text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Office Hours</h3>
              <p className="text-gray-600 mb-4">When we're available to help</p>
              <div className="text-sm text-gray-700">
                <p>Monday - Friday: 9AM - 6PM</p>
                <p>Saturday: 10AM - 4PM</p>
                <p className="text-gray-500">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours with personalized course recommendations.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-field">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-field">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="+91 99999 99999"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                        Interested Course
                      </label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a course</option>
                        <option value="Stock Market Fundamentals">Stock Market Fundamentals</option>
                        <option value="Technical + Derivatives Mastery">Technical + Derivatives Mastery</option>
                        <option value="Stock Market Mastery Program">Stock Market Mastery Program</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                      placeholder="Tell us about your trading experience and goals..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center group"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold mb-2">Find Us Here</h3>
                    <a 
                      href="https://maps.app.goo.gl/417qktSTh8WfSNCu8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-100 hover:text-white transition-colors duration-200"
                    >
                      409/ Golden Square, Near, Kalyan Chowk, Nikol<br />
                      Ahmedabad, Gujarat - 382350
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Transportation</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 20-minutes from Airports Ahmedabad</li>
                    <li>• 2km from Ring Road</li>
                    <li>• Parking available</li>
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Do I need prior trading experience?
                    </h4>
                    <p className="text-sm text-gray-600 ml-7">
                      No! We offer courses for all levels, from complete beginners to advanced traders.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      What's the class schedule like?
                    </h4>
                    <p className="text-sm text-gray-600 ml-7">
                      We offer flexible schedules with evening and weekend options to fit your lifestyle.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Do you offer payment plans?
                    </h4>
                    <p className="text-sm text-gray-600 ml-7">
                      Yes, we offer flexible payment plans to make our courses accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{backgroundColor: '#1e40af'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of successful traders who started their journey with Wealth Genius. 
            Book a free consultation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="magnetic-btn border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Phone className="mr-2 h-6 w-6" />
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Schedule Consultation Modal */}
      <ScheduleModal 
        isOpen={showScheduleModal} 
        onClose={() => setShowScheduleModal(false)} 
      />
    </div>
  );
};

export default Contact;