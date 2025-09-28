import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  Car,
  LineChart,
  Users,
  MessageSquare,
  Target,
  Home,
  CheckCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  ArrowRight,
  Shield,
  TrendingUp,
  Wallet,
  DollarSign,
  Phone,
  BarChart3,
  AlertTriangle,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundWrapper from "@/components/BackgroundWrapper";

const services = [
  {
    title: "AI-Powered Automation",
    description: "Leverage the efficiency and scalability of AI-driven automation to streamline business processes and maximize productivity.",
    icon: <Bot className="h-12 w-12 text-blue-600" />,
    details: "Automate repetitive tasks, optimize workflows, and reduce operational costs while improving accuracy and speed.",
    features: [
      "Process automation and workflow optimization",
      "Intelligent document processing",
      "Robotic Process Automation (RPA)",
      "Custom automation solutions"
    ],
    benefits: "Reduce operational costs by up to 40% while improving accuracy and processing speed."
  },
  {
    title: "Deposit Attrition Management (DAM)",
    description: "Genius360 AI solution that proactively identifies at-risk customers and prevents deposit attrition through intelligent predictions and staff empowerment.",
    icon: <TrendingUp className="h-12 w-12 text-green-600" />,
    details: "Advanced AI system that flags at-risk customers before exit, provides real-time insights to frontline staff, and drives growth through retention.",
    features: [
      "Predictive attrition modeling with risk scores",
      "Real-time intelligent pop-ups for staff",
      "Comprehensive dashboards with churn analysis",
      "Automated lead generation and opportunity tracking"
    ],
    benefits: "Boost profitability, enhance customer loyalty, and gain data-driven insights for strategic decision-making."
  },
  {
    title: "AI Banker & Cross-Selling",
    description: "Multi-language AI banker that executes thousands of personalized calls daily for proactive upselling and cross-selling opportunities.",
    icon: <Phone className="h-12 w-12 text-purple-600" />,
    details: "AI-driven prospecting system that identifies perfect moments for offers and executes scalable engagement with dynamic scripts.",
    features: [
      "Multi-language AI calling capabilities",
      "Dynamic script generation and conversation handling",
      "Intelligent opportunity identification",
      "Seamless handoff to human specialists"
    ],
    benefits: "Lower cost per acquisition (CPA), scalable engagement, and significantly higher ROI on marketing efforts."
  },
  {
    title: "Predictive Analytics",
    description: "Harness the power of AI algorithms to uncover valuable insights, predict trends, and make data-driven decisions that drive business growth.",
    icon: <LineChart className="h-12 w-12 text-indigo-600" />,
    details: "Transform your data into actionable insights with advanced machine learning models and statistical analysis.",
    features: [
      "Advanced statistical modeling",
      "Machine learning algorithms",
      "Real-time data processing",
      "Custom dashboard development"
    ],
    benefits: "Improve decision-making accuracy by 60% with predictive insights and trend analysis."
  },
  {
    title: "Personalized Customer Experiences",
    description: "Deliver personalized experiences to your customers through AI-driven recommendation engines and targeted marketing strategies.",
    icon: <Users className="h-12 w-12 text-pink-600" />,
    details: "Create tailored customer journeys that increase engagement, satisfaction, and lifetime value.",
    features: [
      "Recommendation engines",
      "Customer segmentation",
      "Behavioral analytics",
      "Personalization platforms"
    ],
    benefits: "Increase customer engagement by 75% and boost conversion rates significantly."
  },
  {
    title: "Natural Language Processing",
    description: "Utilize AI-based language processing capabilities to enhance customer interactions, automate customer support, and extract valuable information from unstructured data.",
    icon: <MessageSquare className="h-12 w-12 text-orange-600" />,
    details: "Process and understand human language to automate communications and extract meaningful insights.",
    features: [
      "Chatbot development",
      "Sentiment analysis",
      "Text mining and extraction",
      "Voice recognition systems"
    ],
    benefits: "Reduce customer service costs by 50% while improving response times and satisfaction."
  }
];

const bankingOffers = [
  {
    trigger: "High balance",
    offer: "Islamic Investment Products",
    icon: <Wallet className="h-6 w-6 text-green-600" />
  },
  {
    trigger: "Pre-approved",
    offer: "Car Ijarah",
    icon: <Car className="h-6 w-6 text-blue-600" />
  },
  {
    trigger: "Salaried",
    offer: "Home Financing",
    icon: <Home className="h-6 w-6 text-purple-600" />
  },
  {
    trigger: "Life event detected",
    offer: "Takaful coverage",
    icon: <Shield className="h-6 w-6 text-orange-600" />
  }
];

const faqs = [
  {
    question: "What industries benefit from AI Next's solutions?",
    answer: "AI Next caters to a wide range of industries including finance, healthcare, retail, manufacturing, and more, with tailored AI solutions designed to meet specific sector requirements and compliance standards. Our Genius360 solution is specifically designed for banking and financial institutions."
  },
  {
    question: "How does the Genius360 DAM solution work?",
    answer: "Genius360 uses AI to predict customer attrition by analyzing behavioral patterns and transaction data. It provides real-time alerts to frontline staff with risk scores, root causes, and recommended scripts. The system also includes comprehensive dashboards for tracking churn reasons and deposit risks."
  },
  {
    question: "Can the AI Banker handle multiple languages?",
    answer: "Yes, our AI Banker is multi-language capable and can execute thousands of personalized calls daily. It uses dynamic scripts to gauge interest, answer basic questions, and seamlessly hand off qualified leads to human specialists."
  },
  {
    question: "How can AI Next help my business stay competitive?",
    answer: "By leveraging AI-powered automation, predictive analytics, and personalized experiences, we help businesses improve efficiency, gain insights, and stay ahead of market trends while reducing operational costs. Our solutions provide measurable ROI and tangible business results."
  },
  {
    question: "Is AI implementation costly and complex?",
    answer: "Our solutions are designed to be scalable and adaptable, ensuring businesses of all sizes can adopt AI with minimal disruption, clear ROI projections, and phased implementation approaches. We offer both 'Defense' (retention) and 'Offense' (growth) phases."
  },
  {
    question: "What kind of support does AI Next provide post-implementation?",
    answer: "We offer continuous support, monitoring, optimization, training, and regular updates to ensure your AI solutions remain effective, secure, and up-to-date with the latest technological advances. Our solutions include real-time dashboards and performance tracking."
  }
];

const Services = () => {
  const [isVisible, setIsVisible] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Custom hook to detect screen size below 768px
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
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
    
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleCardHover = (index, isHovering) => {
    if (!isMobile) {
      setFlippedCards(prev => ({
        ...prev,
        [index]: isHovering
      }));
    }
  };

  const handleCardClick = (index) => {
    if (isMobile) {
      setFlippedCards(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Main Content */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <a
                href="/"
                className="inline-flex items-center text-white hover:text-gray-200 mb-8 transition-all duration-300 group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </a>

              {/* Services Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <h2 className="text-4xl font-bold text-white mb-6 text-left">
                  Our Services
                </h2>
                <p className="text-gray-300 text-xl leading-relaxed text-left">
                  We offer a comprehensive suite of AI-powered services designed to
                  meet the diverse needs of modern businesses and drive digital transformation.
                  Our services are built on cutting-edge artificial intelligence technologies, 
                  designed to solve real business challenges and create sustainable competitive advantages.
                </p>
              </motion.div>

              {/* Enhanced Services Grid with Flip Cards - Responsive based on screen size */}
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative min-h-[28rem] md:min-h-[24rem] lg:min-h-[28rem]"
                    style={{ perspective: "1000px" }}
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                    onClick={() => handleCardClick(index)}
                  >
                    <div
                      className={`relative w-full h-full transition-transform duration-700`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0deg)"
                      }}
                    >
                      {/* Front of card */}
                      <div 
                        className="absolute inset-0 w-full h-full backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="p-8 h-full flex flex-col">
                          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110">
                            {service.icon}
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                            {service.title}
                          </h3>
                          
                          <p className="text-gray-300 leading-relaxed flex-grow">
                            {service.description}
                          </p>
                          
                          <div className="mt-6 text-sm text-blue-600 font-medium transition-opacity duration-300">
                            <span className="md:hidden">Tap to learn more →</span>
                            <span className="hidden md:inline">Hover to learn more →</span>
                          </div>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div 
                        className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl border border-blue-100 overflow-hidden"
                        style={{ 
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        }}
                      >
                        <div className="p-8 h-full flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {service.title}
                          </h3>
                          
                          <div className="mb-6 flex-grow overflow-y-auto">
                            <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                            <ul className="space-y-2 mb-4">
                              {service.features.map((feature, featureIndex) => (
                                <motion.li 
                                  key={featureIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: featureIndex * 0.1 }}
                                  className="flex items-start"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                            
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <h4 className="font-semibold text-gray-800 mb-2 text-sm">Expected Impact:</h4>
                              <p className="text-sm text-gray-700">{service.benefits}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-center md:hidden">
                            <div className="text-sm text-gray-600">Tap again to go back</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-20"
              >
                <div className="backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Why Choose AI Next?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
                    <div className="space-y-2 md:space-y-6">
                      {[
                        "Cutting-edge AI technology and methodologies",
                        "Proven track record across multiple industries",
                        "Scalable solutions that grow with your business",
                        "24/7 support and continuous optimization"
                      ].map((benefit, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-6 w-6 text-[#00a67e] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 font-medium">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-2 md:space-y-6 md:ml-12">
                      {[
                        "Custom solutions tailored to your specific needs",
                        "Transparent pricing with clear ROI projections",
                        "Comprehensive training and change management",
                        "Compliance with industry standards and regulations"
                      ].map((benefit, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-6 w-6 text-[#00a67e] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 font-medium">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Section with Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-left text-white mb-6">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-2 text-left">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-300"
                      >
                        <h3 className="text-lg font-bold text-gray-900 leading-tight pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <motion.div
                            animate={{ rotate: openFAQ === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-gray-600" />
                          </motion.div>
                        </div>
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: openFAQ === index ? "auto" : 0,
                          opacity: openFAQ === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-3 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed pt-2">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center backdrop-blur-md rounded-3xl p-12 text-white shadow-2xl border border-white/50"
              >
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="mb-8 text-gray-300 max-w-2xl mx-auto">
                  Let's discuss how our AI solutions can drive growth, efficiency, and innovation in your organization.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-[#00a67e] text-white font-semibold rounded-full hover:bg-[#008a6a] transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </BackgroundWrapper>
  );
};

export default Services;