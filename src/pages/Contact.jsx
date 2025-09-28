import React, { useEffect, useState } from "react";
import { ArrowLeft, AlertCircle, MapPin, Mail, Phone, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("YOUR EMAILJS PUBLIC KEY");

const Contact = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 500);
    };

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", handleScroll);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-hide success/error messages after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const fadeInUp = (id, delay = 0) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.6s ease-out ${delay}s`,
  });

  // Handle phone input to allow only numbers, +, and -
  const handlePhoneInput = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9+\-]/g, '');
    e.target.value = filteredValue;
  };

  // Clear error when user starts typing
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ""
      }));
    }
    // Clear submit status when user starts editing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  // Send email using EmailJS
  const sendEmail = async (formData) => {
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        time: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Karachi',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      };

      const result = await emailjs.send(
        'YOUR EMAILJS SERVICE ID', // Your service ID
        'YOUR EMAILJS TEMPLATE ID', // Your template ID
        templateParams
      );

      console.log('Email sent successfully:', result);
      return { success: true };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.text || 'Failed to send email' };
    }
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              {/* Back to Home */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <a
                  href="/"
                  className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-all duration-300 group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </a>
              </motion.div>

              {/* Page Title */}
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-white mb-6"
              >
                Get in Touch
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white mb-12"
              >
                Interested in joining or collaborating? Contact AI Next to explore
                how our AI solutions can drive your business forward with
                innovative and transformative capabilities. Fill out the form or
                use our contact details below.
              </motion.p>

              {/* Contact Form + Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/50"
                >
                  <div className="space-y-6">
                    {/* Submit Status Messages with Enhanced Animation */}
                    <AnimatePresence mode="wait">
                      {submitStatus === 'success' && (
                        <motion.div
                          key="success"
                          initial={{ 
                            opacity: 0, 
                            y: -20,
                            scale: 0.95
                          }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: 1
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: -10,
                            scale: 0.95,
                            transition: { duration: 0.3 }
                          }}
                          transition={{ 
                            duration: 0.5,
                            type: "spring",
                            damping: 20,
                            stiffness: 300
                          }}
                          className="relative overflow-hidden"
                        >
                          {/* Success Message */}
                          <div className="flex items-center p-4 rounded-xl relative"
                            style={{ 
                              backgroundColor: 'rgba(0, 255, 0, 0.2)', 
                              border: '2px solid rgba(0, 255, 0, 0.2)',
                              color: '#00ff00'
                            }}>
                            {/* Animated Background Gradient */}
                            <motion.div
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                duration: 1.5,
                                ease: "easeInOut",
                                delay: 0.2
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                            />
                            
                            {/* Icon with Pulse Animation */}
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                duration: 0.6,
                                type: "spring",
                                damping: 15,
                                stiffness: 300,
                                delay: 0.1
                              }}
                            >
                              <CheckCircle className="h-5 w-5 mr-3" />
                            </motion.div>
                            
                            {/* Text with Slide In */}
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                              className="relative z-10"
                            >
                              Message sent successfully! We'll get back to you soon.
                            </motion.span>
                          </div>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          key="error"
                          initial={{ 
                            opacity: 0, 
                            y: -20,
                            scale: 0.95
                          }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: 1
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: -10,
                            scale: 0.95,
                            transition: { duration: 0.3 }
                          }}
                          transition={{ 
                            duration: 0.5,
                            type: "spring",
                            damping: 20,
                            stiffness: 300
                          }}
                          className="relative overflow-hidden"
                        >
                          {/* Error Message */}
                          <div className="flex items-center p-4 border rounded-xl text-white relative"
                               style={{ 
                                 backgroundColor: 'rgba(255, 0, 0, 0.2)', 
                                 borderColor: 'rgba(255, 0, 0, 0.5)',
                                 color: '#ff0000'
                               }}>
                            {/* Animated Background Gradient */}
                            <motion.div
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                duration: 1.5,
                                ease: "easeInOut",
                                delay: 0.2
                              }}
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.1), transparent)'
                              }}
                            />
                            
                            {/* Icon with Shake Animation */}
                            <motion.div
                              initial={{ scale: 0, rotate: 180 }}
                              animate={{ 
                                scale: 1, 
                                rotate: 0,
                                x: [0, -2, 2, -2, 2, 0]
                              }}
                              transition={{ 
                                scale: { duration: 0.6, type: "spring", damping: 15, stiffness: 300 },
                                rotate: { duration: 0.6, delay: 0.1 },
                                x: { duration: 0.4, delay: 0.4 }
                              }}
                            >
                              <AlertCircle className="h-5 w-5 mr-3" />
                            </motion.div>
                            
                            {/* Text with Slide In */}
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                              className="relative z-10"
                            >
                              Failed to send message. Please try again or contact us directly.
                            </motion.span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-white mb-2">
                        Full Name <span style={{ color: '#ff0000' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        onChange={() => clearError('name')}
                        className="w-full bg-transparent border-none outline-none px-0 py-2 text-gray-300 placeholder-gray-500"
                        style={{
                          borderBottom: '2px solid #374151',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderBottomColor = '#00a67e';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderBottomColor = '#374151';
                        }}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center text-sm mt-1"
                            style={{ color: '#ff0000' }}
                          >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {errors.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-white mb-2">
                        Email Address <span style={{ color: '#ff0000' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        onChange={() => clearError('email')}
                        className="w-full bg-transparent border-none outline-none px-0 py-2 text-gray-300 placeholder-gray-500"
                        style={{
                          borderBottom: '2px solid #374151',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderBottomColor = '#00a67e';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderBottomColor = '#374151';
                        }}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center text-sm mt-1"
                            style={{ color: '#ff0000' }}
                          >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {errors.email}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-white mb-2">
                        Phone <span style={{ color: '#ff0000' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        onInput={handlePhoneInput}
                        onChange={() => clearError('phone')}
                        className="w-full bg-transparent border-none outline-none px-0 py-2 text-gray-300 placeholder-gray-500"
                        style={{
                          borderBottom: '2px solid #374151',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderBottomColor = '#00a67e';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderBottomColor = '#374151';
                        }}
                      />
                      <AnimatePresence>
                        {errors.phone && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center text-sm mt-1"
                            style={{ color: '#ff0000' }}
                          >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {errors.phone}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-white mb-2">
                        Message <span style={{ color: '#ff0000' }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell us about yourself or your inquiry..."
                        onChange={() => clearError('message')}
                        className="w-full bg-transparent border-none outline-none px-0 py-2 h-24 resize-none text-gray-300 placeholder-gray-500"
                        style={{
                          borderBottom: '2px solid #374151',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderBottomColor = '#00a67e';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderBottomColor = '#374151';
                        }}
                      ></textarea>
                      <AnimatePresence>
                        {errors.message && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center text-sm mt-1"
                            style={{ color: '#ff0000' }}
                          >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {errors.message}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <motion.button
                        type="button"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        onClick={async () => {
                          setIsSubmitting(true);
                          setSubmitStatus(null);
                          
                          // Get form values
                          const name = document.querySelector('input[name="name"]').value.trim();
                          const email = document.querySelector('input[name="email"]').value.trim();
                          const phone = document.querySelector('input[name="phone"]').value.trim();
                          const message = document.querySelector('textarea[name="message"]').value.trim();

                          // Reset errors
                          const newErrors = {};

                          // Check for empty fields
                          if (!name) newErrors.name = "Full name is required";
                          if (!email) newErrors.email = "Email address is required";
                          if (!phone) newErrors.phone = "Phone number is required";
                          if (!message) newErrors.message = "Message is required";

                          // Email validation
                          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                            newErrors.email = "Please enter a valid email address";
                          }

                          // Phone validation
                          if (phone && !/^[0-9+\-]+$/.test(phone)) {
                            newErrors.phone = "Phone number can only contain numbers, +, and -";
                          }

                          setErrors(newErrors);

                          // If no errors, send email
                          if (Object.keys(newErrors).length === 0) {
                            const result = await sendEmail({
                              name,
                              email,
                              phone,
                              message
                            });

                            if (result.success) {
                              setSubmitStatus('success');
                              // Clear form
                              document.querySelector('input[name="name"]').value = '';
                              document.querySelector('input[name="email"]').value = '';
                              document.querySelector('input[name="phone"]').value = '';
                              document.querySelector('textarea[name="message"]').value = '';
                            } else {
                              setSubmitStatus('error');
                              console.error('Email sending error:', result.error);
                            }
                          }
                          
                          setIsSubmitting(false);
                        }}
                        className="w-full px-6 py-3 bg-[#00a67e] hover:bg-[#008a6a] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Sending...
                          </motion.div>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-2xl space-y-6"
                >

                  {/* Emails */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="h-6 w-6 mt-1" style={{ color: '#00a67e' }} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Email Addresses
                      </h3>
                      <p className="text-gray-300 font-medium">babbar@ai-next.co</p>
                      <p className="text-gray-300 font-medium">kamran@ai-next.co</p>
                      <p className="text-gray-300 font-medium">abbas@ai-next.co</p>
                      <p className="text-gray-300 font-medium">raza@ai-next.co</p>
                    </div>
                  </motion.div>

                  {/* Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="h-6 w-6 mt-1" style={{ color: '#00a67e' }} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Address
                      </h3>
                      <p className="text-gray-300 font-medium">Mezzanine floor II, Faiyaz Center, Shahra-e-Faisal, Block 3-A Sindhi Muslim CHS (SMCHS) </p>
                      <p className="text-gray-300 font-medium">Karachi, 75400, Pakistan</p>
                    </div>
                  </motion.div>

                  {/* Timings */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className="h-6 w-6 mt-1" style={{ color: '#00a67e' }} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Regular Timings
                      </h3>
                      <p className="text-gray-300 font-medium">9:00 a.m to 11:00 p.m (UTC+5)</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </BackgroundWrapper>
  );
};

export default Contact;
