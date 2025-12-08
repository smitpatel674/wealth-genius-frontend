import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate available time slots (9 AM to 6 PM, all 7 days)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // All time slots are available since we start from tomorrow
  const getAvailableTimeSlots = (selectedDate: string) => {
    return timeSlots; // All slots available for all future dates
  };

  // Get next 30 days (including weekends)
  const getBusinessDays = () => {
    const days = [];
    const today = new Date();
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + 1); // Start from tomorrow
    
    while (days.length < 30) {
      // Include all days (no weekend exclusion)
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const businessDays = getBusinessDays();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { api } = await import('../services/api');
      
      const result = await api.consultation.schedule({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        message: formData.message
      });

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            message: ''
          });
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert(`Error: ${result.message || 'Failed to schedule consultation'}`);
      }
    } catch (error: any) {
      console.error('Error scheduling consultation:', error);
      alert(`Failed to schedule consultation: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center mx-4">
          <div className="mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Consultation Scheduled!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Your consultation has been successfully scheduled. You will receive a confirmation email shortly.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-2xl font-bold leading-tight">
                  Schedule Free Consultation
                </h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-base">
                  Book a 30-minute session with our trading experts
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Form */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Preferred Date *
                </label>
                <select
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                >
                  <option value="">Select a date</option>
                  {businessDays.map((date, index) => (
                    <option key={index} value={date.toISOString().split('T')[0]}>
                      {date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Clock className="h-4 w-4 inline mr-2" />
                Preferred Time *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                {timeSlots.map((slot) => (
                  <label key={slot} className="cursor-pointer">
                    <input
                      type="radio"
                      name="time"
                      value={slot}
                      checked={formData.time === slot}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-2 sm:p-3 text-center rounded-lg border-2 transition-colors text-sm sm:text-base ${
                      formData.time === slot 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}>
                      {slot}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-base"
                placeholder="Tell us about your trading goals or any specific questions..."
              />
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">What to Expect:</h4>
              <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                <li>• 30-minute one-on-one consultation</li>
                <li>• Personalized trading strategy discussion</li>
                <li>• Course recommendations based on your goals</li>
                <li>• Q&A session with our expert</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                    Scheduling...
                  </>
                ) : (
                  'Schedule Consultation'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;