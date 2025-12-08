import React from 'react';
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-1">Wealth Genius</h3>
              <p className="text-lg text-blue-300 font-semibold">Trading Institute</p>
            </div>
            <p className="text-blue-200 mb-4">
              Empowering traders with comprehensive market education and practical training for successful trading careers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-blue-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/courses" className="text-blue-200 hover:text-white transition-colors">Courses</a></li>
              <li><a href="/gallery" className="text-blue-200 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="/blog" className="text-blue-200 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200">+91 96245 18383</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200">info@wealthgenius.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-300" />
                <a 
                  href="https://maps.app.goo.gl/417qktSTh8WfSNCu8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  409/ Golden Square, Nikol, Ahmedabad
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/wealthgenius__ahmedabad/" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-300">&copy; 2025 Wealth Genius Trading Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;