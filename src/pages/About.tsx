import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";


const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    // Floating button scroll handler
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 500);
    };
    
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fadeInUp = (id, delay = 0) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s ease-out ${delay}s`
  });

  const scaleIn = (id, delay = 0) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'scale(1)' : 'scale(0.8)',
    transition: `all 0.5s ease-out ${delay}s`
  });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 pb-8 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center text-gray-200 hover:text-gray-700 mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>

              <motion.h1 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className="text-4xl font-bold text-white mb-6"
              >
                About Us
              </motion.h1>

              <div
                id="hero-title" 
                data-animate
                style={fadeInUp('hero-title')}
                className="mb-12"
              >
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.5, delay: 0.2 }} 
                  className="text-xl text-gray-300 mb-12"
                >
                  We're a team of AI experts dedicated to bridging the gap between business challenges and technology solutions.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                    <p className="text-gray-300">
                      At AI Next, we are passionate about harnessing the potential of AI to revolutionize the way businesses operate and thrive in the digital age.
                    </p>
                    <p className="text-gray-300">
                      We believe that by implementing intelligent automation and data-driven insights, we can create more efficient, responsive, and competitive organizations.
                    </p>
                    <p className="text-gray-300">
                      Beyond providing services, we aspire to build lasting partnerships rooted in integrity and ethics, fully committed to driving the growth and success of our clients.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl p-8 border border-gray-100 backdrop-blur-md shadow-2xl border border-white/50"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white">Our Values</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start text-gray-300">
                        <CheckCircle className="h-5 w-5 text-[#00a67e] mt-1 mr-3 flex-shrink-0" />
                        <span><strong>Innovation:</strong> We push boundaries to create solutions that weren't possible before.</span>
                      </li>
                      <li className="flex items-start text-gray-300">
                        <CheckCircle className="h-5 w-5 text-[#00a67e] mt-1 mr-3 flex-shrink-0" />
                        <span><strong>Quality:</strong> We're committed to excellence in every solution we deliver.</span>
                      </li>
                      <li className="flex items-start text-gray-300">
                        <CheckCircle className="h-5 w-5 text-[#00a67e] mt-1 mr-3 flex-shrink-0" />
                        <span><strong>Collaboration:</strong> We work closely with our clients to ensure their unique needs are met.</span>
                      </li>
                      <li className="flex items-start text-gray-300">
                        <CheckCircle className="h-5 w-5 text-[#00a67e] mt-1 mr-3 flex-shrink-0" />
                        <span><strong>Impact:</strong> We measure success by the tangible differences our technology makes in the real world.</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
      
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
                  <div className="backdrop-blur-md shadow-2xl border border-white/50 rounded-xl border border-gray-300 p-8 shadow-sm">
                    <p className="text-gray-300 mb-4">
                      At AI Next, we are passionate about harnessing the potential of AI to revolutionize the way businesses operate and thrive in the digital age.
                      Our team combines deep technical expertise with extensive business knowledge to deliver transformative AI solutions that drive real results.
                      We believe in responsible AI development that creates value for businesses while maintaining ethical standards and transparency in all our implementations.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Team Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-16"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div 
                    id="team-header" 
                    data-animate
                    style={fadeInUp('team-header')}
                    className="text-center mb-16"
                  >
                    <h2 className="text-3xl font-bold mb-6 text-white">Professional Team</h2>
                    <p className="text-gray-300 mb-8">
                      With a dedicated team of AI experts and a commitment to delivering exceptional value to our clients, we are at the forefront of driving AI-powered transformation across industries.
                    </p>
                  </div>

                  {/* Updated Team Cards - All 5 team members with better layout */}
                  <div className="space-y-12">
                    {/* Top Row - 3 Co-founders and Partners */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                      {[
                        { 
                          name: "Kamran Jafar", 
                          role: "Co-founder and Partner",
                          linkedin: "https://www.linkedin.com/in/kamran-jafar-493822195" // Add actual LinkedIn URL
                        },
                        { 
                          name: "Sameera Wajid", 
                          role: "Co-founder and Partner",
                          linkedin: "https://www.linkedin.com/in/sameera-wajid-95b4b4a" // Add actual LinkedIn URL
                        },
                        { 
                          name: "Raza Abbas Iqbal", 
                          role: "Co-founder and Partner",
                          linkedin: "https://www.linkedin.com/in/raza-abbas-iqbal-012791213/" // Add actual LinkedIn URL
                        }
                      ].map((member, index) => (
                        <div
                          key={index}
                          id={`team-${index}`}
                          data-animate
                          style={fadeInUp(`team-${index}`, index * 0.1)}
                          className="backdrop-blur-md shadow-2xl border border-white/50 rounded-2xl p-8 border border-gray-200 shadow-sm text-center group hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                            <p className="text-[#00a67e] text-base font-semibold mb-4">{member.role}</p>
                            
                            {/* LinkedIn Button */}
                            <a 
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200 group/linkedin"
                              aria-label={`${member.name}'s LinkedIn profile`}
                            >
                              <FaLinkedinIn className="w-5 h-5 group-hover/linkedin:scale-110 transition-transform duration-200" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row - 2 Co-founders centered */}
                    <div className="flex justify-center">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
                        {[
                          { 
                            name: "Babbar Wajid", 
                            role: "Co-founder",
                            linkedin: "https://www.linkedin.com/in/babbar-wajid-bb93b19" // Add actual LinkedIn URL
                          },
                          { 
                            name: "Abbas Ali Iqbal", 
                            role: "Co-founder",
                            linkedin: "https://www.linkedin.com/in/abbas-ali-iqbal" // Add actual LinkedIn URL
                          }
                        ].map((member, index) => (
                          <div
                            key={index + 3}
                            id={`team-${index + 3}`}
                            data-animate
                            style={fadeInUp(`team-${index + 3}`, (index + 3) * 0.1)}
                            className="backdrop-blur-md shadow-2xl border border-white/50 rounded-2xl p-8 border border-gray-200 shadow-sm text-center group hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                          >
                            <div className="mb-6">
                              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                              <p className="text-[#00a67e] text-base font-semibold mb-4">{member.role}</p>
                              
                              {/* LinkedIn Button */}
                              <a 
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200 group/linkedin"
                                aria-label={`${member.name}'s LinkedIn profile`}
                              >
                                <FaLinkedinIn className="w-5 h-5 group-hover/linkedin:scale-110 transition-transform duration-200" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </BackgroundWrapper>
  );
};

export default About;