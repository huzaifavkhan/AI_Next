import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle, AlertCircle } from "lucide-react";

const DetailsSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: ""
  });

  // Track which errors are visible for animation purposes
  const [visibleErrors, setVisibleErrors] = useState({
    fullName: false,
    email: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      // First hide the error with animation
      setVisibleErrors(prev => ({
        ...prev,
        [name]: false
      }));
      
      // Then clear the error message after animation completes
      setTimeout(() => {
        setFieldErrors(prev => ({
          ...prev,
          [name]: ""
        }));
      }, 300); // Match the CSS transition duration
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showFieldError = (field: keyof typeof fieldErrors, message: string) => {
    // Set the error message first
    setFieldErrors(prev => ({
      ...prev,
      [field]: message
    }));

    // Then make it visible with animation
    setTimeout(() => {
      setVisibleErrors(prev => ({
        ...prev,
        [field]: true
      }));
    }, 50); // Small delay to ensure the DOM is updated

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setVisibleErrors(prev => ({
        ...prev,
        [field]: false
      }));
      
      // Clear the message after animation
      setTimeout(() => {
        setFieldErrors(prev => ({
          ...prev,
          [field]: ""
        }));
      }, 300);
    }, 5000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Clear any existing errors
    setVisibleErrors({
      fullName: false,
      email: false
    });
    
    setTimeout(() => {
      setFieldErrors({
        fullName: "",
        email: ""
      });
    }, 300);

    let hasErrors = false;

    // Small delay to allow clearing animations to complete
    setTimeout(() => {
      // Validation
      if (!formData.fullName.trim()) {
        showFieldError("fullName", "Please enter your full name");
        hasErrors = true;
      }

      if (!formData.email.trim()) {
        showFieldError("email", "Please enter your email address");
        hasErrors = true;
      } else if (!validateEmail(formData.email)) {
        showFieldError("email", "Please enter a valid email address");
        hasErrors = true;
      }

      if (hasErrors) {
        setIsSubmitting(false);
        return;
      }

      // Proceed with form submission if no errors
      submitForm();
    }, 350);
  };

  const submitForm = async () => {
    try {
      // Create email template
      const subject = "Request for Demo – AI Next";
      const companyText = formData.company.trim() 
        ? ` / organization ${formData.company.trim()}` 
        : "";
      const companySignature = formData.company.trim() 
        ? `\n${formData.company.trim()}` 
        : "";

      const emailBody = `Hello,

        I'm interested in learning more about AI Next and how your solutions can support my business${companyText}. Could you please arrange a demo session at a convenient time?

        Looking forward to your response.

        Best regards,
        ${formData.fullName.trim()}
        ${formData.email.trim()}${companySignature}`;

      // Create mailto link
      const mailtoLink = `mailto:babbar@ai-next.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      toast.success("Email client opened! Please send the email to complete your demo request.");

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        company: ""
      });

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error('Email error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <section id="details" className="w-full bg-white py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card - The Details */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image instead of gradient */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end" style={{
            backgroundImage: "url('/background-section3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                Why AI Next
              </h2>
            </div>
            
            {/* Card Content */}
            <div className="bg-white p-4 sm:p-8" style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #ECECEC"
          }}>
              <h3 className="text-lg sm:text-xl font-display mb-6 sm:mb-8">
                Innovation-first approach meets client-centric solutions
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#00a67e] mt-4 flex-shrink-0" />
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                      <span className="font-semibold text-base">Industries Served:</span> Banking
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#00a67e] mt-4 flex-shrink-0" />
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                      <span className="font-semibold text-base">Approach:</span>  Innovation-first
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#00a67e] mt-4 flex-shrink-0" />
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                      <span className="font-semibold text-base">Focus:</span> Client-centric
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#00a67e] mt-4 flex-shrink-0" />
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                      <span className="font-semibold text-base">Mission:</span> Responsible AI
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#00a67e] mt-4 flex-shrink-0" />
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                      <span className="font-semibold text-base">Support:</span> Global team, comprehensive service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Contact Form */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image instead of gradient */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start" style={{
            backgroundImage: "url('/background-section1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
              <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                Request a demo
              </div>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                Experience it for yourself
              </h2>
            </div>
            
            {/* Card Content - Form */}
            <div className="bg-white p-4 sm:p-8" style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #ECECEC"
          }}>
              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="Full name *" 
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none ${
                      fieldErrors.fullName ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                    }`}
                    style={{
                      '--tw-ring-color': '#00a67e',
                      '--tw-ring-opacity': '1'
                    } as React.CSSProperties}
                    onFocus={(e) => {
                      if (!fieldErrors.fullName) {
                        e.target.style.borderColor = '#00a67e';
                        e.target.style.boxShadow = '0 0 0 2px rgba(0, 166, 126, 0.2)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!fieldErrors.fullName) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {fieldErrors.fullName && (
                    <div className={`mt-2 flex items-center gap-2 transition-all duration-300 ease-out ${
                      visibleErrors.fullName 
                        ? 'opacity-100 translate-y-0 max-h-20' 
                        : 'opacity-0 -translate-y-2 max-h-0'
                    }`}>
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-red-600">
                        {fieldErrors.fullName}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email address *" 
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none ${
                      fieldErrors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                    }`}
                    style={{
                      '--tw-ring-color': '#00a67e',
                      '--tw-ring-opacity': '1'
                    } as React.CSSProperties}
                    onFocus={(e) => {
                      if (!fieldErrors.email) {
                        e.target.style.borderColor = '#00a67e';
                        e.target.style.boxShadow = '0 0 0 2px rgba(0, 166, 126, 0.2)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!fieldErrors.email) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {fieldErrors.email && (
                    <div className={`mt-2 flex items-center gap-2 transition-all duration-300 ease-out ${
                      visibleErrors.email 
                        ? 'opacity-100 translate-y-0 max-h-20' 
                        : 'opacity-0 -translate-y-2 max-h-0'
                    }`}>
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-red-600">
                        {fieldErrors.email}
                      </span>
                    </div>
                  )}
                </div>
                
                <div>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="Company (optional)" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none transition-all duration-200"
                    style={{
                      '--tw-ring-color': '#00a67e',
                      '--tw-ring-opacity': '1'
                    } as React.CSSProperties}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#00a67e';
                      e.target.style.boxShadow = '0 0 0 2px rgba(0, 166, 126, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div>
                  <button 
                    type="button" 
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full px-6 py-3 bg-[#00a67e] hover:bg-[#008a6a] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-1 hover:opacity-90 disabled:hover:translate-y-0 disabled:hover:opacity-100"
                  >
                    {isSubmitting ? 'Processing...' : 'Request Demo'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default DetailsSection;