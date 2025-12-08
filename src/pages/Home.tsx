import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendingUp, Users, Award, BookOpen, CheckCircle, Star, 
  Shield, Clock, Target, BarChart, IndianRupee, 
  Zap, Globe, HeadphonesIcon, Phone, Activity, 
  TrendingDown, ArrowUpRight, ArrowDownRight, Eye, X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
import Interactive3DHero from '../components/Interactive3DHero';
import ScheduleModal from '../components/ScheduleModal';

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const coursesRef = useRef(null);
  const whyChooseRef = useRef(null);
  const successRef = useRef(null);
  const testimonialsRef = useRef(null);
  const instructorsRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const marketWidgetRef = useRef(null);

  // Enrollment form state
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: ''
  });

  // Schedule modal state
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Form handling functions
  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { api } = await import('../services/api');
      
      const result = await api.enrollment.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        course_title: selectedCourse?.title,
        course_price: selectedCourse?.price
      });
      
      if (result.success) {
        alert(result.message || 'Thank you for your enrollment! We will contact you within 24 hours.');
        setShowEnrollmentForm(false);
        setFormData({ name: '', city: '', phone: '', email: '' });
      } else {
        alert(`Error: ${result.message || 'Failed to submit enrollment'}`);
      }
    } catch (error: any) {
      console.error('Error submitting enrollment:', error);
      alert(`Failed to submit enrollment: ${error.message || 'Please try again.'}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeModal = () => {
    setShowEnrollmentForm(false);
    setFormData({ name: '', city: '', phone: '', email: '' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // 3D Hero Animation - handled by Three.js component

      // Enhanced Stats Counter Animation with morphing effects
      gsap.fromTo('.stat-number', 
        { 
          innerText: 0, 
          scale: prefersReducedMotion ? 1 : 0.8, 
          opacity: 0,
          rotationX: -90,
          transformOrigin: "center center"
        },
        {
          innerText: (_i: number, el: any) => el.getAttribute('data-count'),
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: prefersReducedMotion ? 0.1 : 2.0,
          snap: { innerText: 1 },
          ease: prefersReducedMotion ? "none" : "power2.out",
          stagger: prefersReducedMotion ? 0 : 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add particle burst effect to stats
      gsap.utils.toArray('.stat-number').forEach((stat: any) => {
        ScrollTrigger.create({
          trigger: stat,
          start: "top 80%",
          onEnter: () => {
            // Create particle burst effect
            gsap.fromTo(stat, 
              { 
                filter: "blur(0px) brightness(1)",
                boxShadow: "0 0 0px rgba(59, 130, 246, 0)"
              },
              { 
                filter: "blur(2px) brightness(1.5)",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
              }
            );
          }
        });
      });

      // Animate stat icons
      gsap.fromTo('.stat-icon', 
        { y: 50, opacity: 0, rotation: -180 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        }
      );

      // Enhanced Features Animation with 3D effects
      gsap.fromTo('.feature-card', 
        { opacity: 0, y: 100, rotationX: -15, scale: 0.8 },
        {
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Feature card hover animations
      gsap.set('.feature-card', { transformOrigin: "center center" });

      // Enhanced Courses Animation with magnetic effect
      gsap.fromTo('.course-item', 
        { opacity: 0, scale: 0.8, y: 80, rotationY: -20 },
        {
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotationY: 0,
          duration: 1.0,
          ease: "back.out(1.7)",
          stagger: 0.25,
          scrollTrigger: {
            trigger: coursesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced Why Choose Us Animation with slide and fade
      gsap.fromTo('.why-item', 
        { opacity: 0, x: -100, rotation: -5 },
        {
          opacity: 1, 
          x: 0, 
          rotation: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: whyChooseRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced Success Stories Animation with bounce
      gsap.fromTo('.success-metric', 
        { opacity: 0, scale: 0.5, y: 50, rotation: 10 },
        {
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: successRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced Testimonials Animation with wave effect
      gsap.fromTo('.testimonial-card', 
        { opacity: 0, y: 60, scale: 0.9, rotationX: 15 },
        {
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced Instructors Animation with flip effect
      gsap.fromTo('.instructor-card', 
        { opacity: 0, y: 80, rotationY: -90, scale: 0.8 },
        {
          opacity: 1, 
          y: 0, 
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: instructorsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced FAQ Animation with accordion effect
      gsap.fromTo('.faq-item', 
        { opacity: 0, x: -60, scale: 0.95, height: 0 },
        {
          opacity: 1, 
          x: 0, 
          scale: 1,
          height: "auto",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced CTA Animation with dramatic entrance
      gsap.fromTo('.cta-content', 
        { opacity: 0, y: 100, scale: 0.8, rotationX: 20 },
        {
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Continuous floating animation for hero cards
      gsap.to('.floating-card', {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

      // Parallax scrolling effects
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text reveal animations
      gsap.utils.toArray('.reveal-text').forEach((text: any) => {
        gsap.fromTo(text, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Magnetic button effect
      gsap.utils.toArray('.magnetic-btn').forEach((btn: any) => {
        btn.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      // Add advanced morphing effects to feature cards
      gsap.utils.toArray('.feature-card').forEach((card: any) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            rotationX: 5,
            z: 50,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Add data stream effect to course items
      gsap.utils.toArray('.course-item').forEach((course: any) => {
        ScrollTrigger.create({
          trigger: course,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(course, 
              { 
                background: "linear-gradient(45deg, transparent, transparent)",
                borderColor: "rgb(229, 231, 235)"
              },
              { 
                background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))",
                borderColor: "rgb(59, 130, 246)",
                duration: 1,
                ease: "power2.out"
              }
            );
          }
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const courses = [
    {
      title: "Stock Market Fundamentals",
      description: "Perfect foundation for beginners",
      duration: "4 weeks",
      level: "Beginner",
      price: "₹15,000",
      icon: <BookOpen className="h-8 w-8" />,
      features: ["Market basics & segments","Investment planning & risk control","Trader types, IPOs & psychology","Intro to charting software"]
    },
    {
      title: "Technical + Derivatives Mastery",
      description: "Advanced chart reading techniques",
      duration: "8 weeks",
      level: "Intermediate",
      price: "₹20,000",
      icon: <BarChart className="h-8 w-8" />,
      features: ["Advanced technical analysis tools","Sector & index trend trading","Futures, options & Greeks","Gap strategies, MCX & intraday","Backtesting, mentorship & certification"]
    },
    {
      title: "Stock Market Mastery Program",
      description: "Master complex options strategies",
      duration: "12 weeks",
      level: "Advanced",
      price: "₹35,000",
      icon: <TrendingUp className="h-8 w-8" />,
      features: ["Stock Market Fundamentals","Technical analysis","Derivatives"]
    }
  ];

  const instructors = [
    {
      name: "Nainesh Patel",
      title: "Founder & CEO",
      experience: "2+ years Institutional",
      specialty: "Day Trading & Options",
      image: "/images/nainesh-patel.png",
      profileLink: "/instructor/nainesh-patel"
    },
    {
      name: "Kaushal Patel",
      title: "Head of Curriculum",
      experience: "2+ years Institutional",
      specialty: "Fundamental Analysis",
      image: "/images/kaushal-patel.png",
      profileLink: "/instructor/kaushal-patel"
    }
  ];

  const faqs = [
    {
      question: "Do I need prior trading experience?",
      answer: "Not at all! Our courses are designed for all levels, from complete beginners to experienced traders looking to refine their skills."
    },
    {
      question: "What's the success rate of your students?",
      answer: "95% of our students report improved trading performance within 6 months, with 78% achieving consistent profitability."
    },
    {
      question: "Do you provide ongoing support after course completion?",
      answer: "Yes! All students get lifetime access to our community forum and monthly Q&A sessions with instructors."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your investment."
    },
    {
      question: "Are the courses available online or in-person?",
      answer: "We offer both options! You can attend live sessions in our NYC location or join virtually from anywhere in the world."
    },
    {
      question: "How much capital do I need to start trading?",
      answer: "You can start learning with our simulator using virtual money. For live trading, we recommend starting with at least $1,000."
    }
  ];

  return (
    <div ref={heroRef} className="pt-0">
      {/* Interactive 3D Hero Section */}
      <Interactive3DHero />

      {/* Enhanced Stats Section */}
      <section ref={statsRef} className="py-12 sm:py-20 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="reveal-text text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">Trusted by Aspiring Traders Across India</h2>
            <p className="reveal-text text-base sm:text-lg md:text-xl text-blue-200 px-2">Real Trading Education | Real Results | Real Success Stories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="stat-icon bg-blue-800 p-2 sm:p-4 rounded-full w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 flex items-center justify-center animate-float">
                <Users className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="stat-number text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2" data-count="100">0</div>
              <p className="text-blue-200 font-medium text-xs sm:text-sm md:text-base">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="stat-icon bg-blue-800 p-2 sm:p-4 rounded-full w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 flex items-center justify-center animate-float">
                <IndianRupee className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="stat-number text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2" data-count="15">0</div>
              <p className="text-blue-200 font-medium text-xs sm:text-sm md:text-base">Lakhs in Profits</p>
            </div>
            <div className="text-center">
              <div className="stat-icon bg-blue-800 p-2 sm:p-4 rounded-full w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 flex items-center justify-center animate-float">
                <Award className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="stat-number text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2" data-count="95">0</div>
              <p className="text-blue-200 font-medium text-xs sm:text-sm md:text-base">Success Rate %</p>
            </div>
            <div className="text-center">
              <div className="stat-icon bg-blue-800 p-2 sm:p-4 rounded-full w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 flex items-center justify-center animate-float">
                <Globe className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="stat-number text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2" data-count="2">0</div>
              <p className="text-blue-200 font-medium text-xs sm:text-sm md:text-base">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="reveal-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 md:mb-6 px-2">Why Choose Wealth Genius for Trading Education</h2>
            <p className="reveal-text text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              We provide comprehensive stock market training with live trading sessions, expert mentorship, 
              and practical strategies specifically designed for the Indian stock market. Transform from a beginner 
              to a confident trader with our proven curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover-lift hover-glow">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert-Led Training</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Learn from experienced traders who have successfully navigated the Indian stock market with years of practical trading experience.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Live market trading sessions
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Personal mentorship & guidance
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Real-time NSE & BSE analysis
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover-lift hover-glow">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Practical Trading Education</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Hands-on learning with real market scenarios, live chart analysis, and practical trading strategies for Indian markets.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Live market analysis & chart reading
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Technical & fundamental analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Futures & Options trading strategies
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover-lift hover-glow">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Supportive Learning Community</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Join a community of traders learning together, sharing market insights, and supporting each other's trading journey.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Active trading community
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Regular doubt-solving sessions
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Lifetime access to resources
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover-lift hover-glow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Capital Protection & Risk Management</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Learn essential risk management techniques to protect your capital and trade safely in volatile Indian markets.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Position sizing & money management
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Stop-loss & target strategies
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Trading psychology & discipline
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover-lift hover-glow">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Cutting-Edge Technology</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Leverage AI-powered market analysis and automated trading tools for better decisions.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  AI market sentiment analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Automated screening tools
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Real-time alerts system
                </li>
              </ul>
            </div>

            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover-lift hover-glow">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HeadphonesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Support System</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Get help whenever you need it with our comprehensive support system and resources.</p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  24/7 technical support
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Comprehensive knowledge base
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Video tutorial library
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section ref={coursesRef} className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 md:mb-6 px-2">Our Comprehensive Trading Courses</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From stock market fundamentals to advanced derivatives trading - master the complete trading journey 
              with our structured courses designed for the Indian stock market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="course-item bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group hover-lift hover-scale">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {course.icon}
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>

                  <div className="space-y-3 mb-6">
                    {course.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{course.price}</div>
                  </div>

                  <button 
                    onClick={() => handleEnrollClick(course)}
                    className="magnetic-btn w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 group-hover:shadow-lg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/courses')}
              className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 sm:mb-6 md:mb-8">Why 95% of Our Students Succeed</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Our comprehensive training approach combines market theory with live trading practice, 
                real market analysis, and expert mentorship. Learn to trade confidently in NSE, BSE, 
                and MCX markets with strategies that actually work.
              </p>

              <div className="space-y-6">
                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Personalized Learning Path</h4>
                    <p className="text-gray-600">Customized curriculum based on your experience level and trading goals.</p>
                  </div>
                </div>

                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Small Class Sizes</h4>
                    <p className="text-gray-600">Maximum 15 students per class ensures personal attention from instructors.</p>
                  </div>
                </div>

                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Proven Track Record</h4>
                    <p className="text-gray-600">10 years of success with over $50M in student profits generated.</p>
                  </div>
                </div>

                <div className="why-item flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4 mt-1">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Risk-First Approach</h4>
                    <p className="text-gray-600">Learn to protect your capital before focusing on profits - the key to long-term success.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Student Success Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Profitable After 6 Months</span>
                      <span className="font-bold text-green-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Course Completion Rate</span>
                      <span className="font-bold text-blue-600">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Student Satisfaction</span>
                      <span className="font-bold text-purple-600">97%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full" style={{width: '97%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Average ROI Improvement</span>
                      <span className="font-bold text-orange-600">340%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-500 h-3 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section ref={successRef} className="py-12 sm:py-16 md:py-24 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2">Real Success Stories</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 max-w-3xl mx-auto px-4">
              See how our students transformed their financial lives through disciplined trading education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="success-metric bg-blue-800 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">₹2.3M</div>
              <p className="text-blue-200 mb-4">Total Student Profits This Year</p>
              <div className="bg-blue-700 rounded-lg p-4">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-blue-100">+127% from last year</p>
              </div>
            </div>

            <div className="success-metric bg-blue-800 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">87%</div>
              <p className="text-blue-200 mb-4">Average Win Rate</p>
              <div className="bg-blue-700 rounded-lg p-4">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-blue-100">Industry leading performance</p>
              </div>
            </div>

            <div className="success-metric bg-blue-800 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">156</div>
              <p className="text-blue-200 mb-4">Full-Time Traders Created</p>
              <div className="bg-blue-700 rounded-lg p-4">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-blue-100">Financial freedom achieved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section ref={testimonialsRef} className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 md:mb-6 px-2">What Our Students Say</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">Hear from traders who transformed their lives with Wealth Genius</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-gray-50 p-8 rounded-2xl relative">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Wealth Genius didn't just teach me to trade - they taught me to think like a professional trader. 
                I went from losing money consistently to generating ₹100K+ monthly profits."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Smit Patel</h4>
                  <p className="text-sm text-gray-600">Former Engineer → Full-Time Day Trader</p>
                  <p className="text-xs text-green-600 font-semibold">+₹1M Annual Profit</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-gray-50 p-8 rounded-2xl relative">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "The risk management principles I learned here saved me from major losses during market volatility. 
                My portfolio is now consistently profitable with controlled risk."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MJ
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Nayan Patel</h4>
                  <p className="text-sm text-gray-600">Marketing Manager → Swing Trader</p>
                  <p className="text-xs text-green-600 font-semibold">+₹85K Portfolio Growth</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-gray-50 p-8 rounded-2xl relative">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Best investment I've ever made. The knowledge and mentorship I received here have 
                generated returns that paid for the course 50 times over."
              </blockquote>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  RD
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Love Patel</h4>
                  <p className="text-sm text-gray-600">Business Man → Part Time Options Trader</p>
                  <p className="text-xs text-green-600 font-semibold">+₹250K in 18 Months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Instructors */}
      <section ref={instructorsRef} className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 md:mb-6 px-2">Learn from the Best</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Our instructors are seasoned professionals with decades of combined Wall Street and 
              institutional trading experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
            {instructors.map((instructor, index) => (
              <div key={index} className="instructor-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">${instructor.name.split(' ').map(n => n[0]).join('')}</div>`;
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{instructor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{instructor.title}</p>
                  <p className="text-gray-600 mb-4">{instructor.experience}</p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800 font-semibold">Specializes in:</p>
                    <p className="text-blue-600">{instructor.specialty}</p>
                  </div>
                  <button 
                    onClick={() => window.open(instructor.profileLink, '_blank')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 md:mb-6 px-2">Frequently Asked Questions</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Get answers to the most common questions about our trading education programs
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-11">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button 
              onClick={() => window.open('tel:+919408611281', '_self')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="cta-content text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">Ready to Master Stock Market Trading?</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              Start your trading journey with Wealth Genius today. Learn from expert traders, 
              practice with real market scenarios, and build the skills to trade confidently in Indian stock markets. 
              Your path to financial success starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="magnetic-btn border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center"
            >
              <Phone className="mr-2 h-6 w-6" />
              Schedule Free Consultation
            </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-blue-100">No Credit Card Required</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-blue-100">30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-blue-100">Instant Access to All Materials</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md my-4 sm:my-8 mx-2 sm:mx-auto">
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800 leading-tight">
                    Enroll in {selectedCourse?.title}
                  </h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full flex-shrink-0 ml-2"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Fill out the form below to start your trading journey
                </p>
              </div>
            
            <form onSubmit={handleFormSubmit} className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                    placeholder="Enter your city"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Course Fee:</span>
                  <span className="text-lg sm:text-2xl font-bold text-blue-600">{selectedCourse?.price}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Submit Enrollment
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Consultation Modal */}
      <ScheduleModal 
        isOpen={showScheduleModal} 
        onClose={() => setShowScheduleModal(false)} 
      />
    </div>
  );
};

export default Home;
