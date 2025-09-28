import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-4 pb-5 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10">
          
          {/* Left Section - Logo and Description (spans 2 columns on desktop) */}
          <div className="lg:col-span-2">
            <img 
              src="/uploads/logo.png" 
              alt="AI Next Logo" 
              className="h-44 w-auto -ml-12 -mb-6"
            />
            <p className="text-gray-300 mb-6 max-w-xl">
              AI Next Technologies is an AI Development company designed to help businesses optimize their opportunities through the power of AI.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/ainextco/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-6 md:mt-10 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col items-start lg:items-end">
            <div className="text-left">
              <div className="text-white mb-6">
                <h4 className="text-lg font-medium mb-3 md:mb-1 md:mt-10 text-white">Email Addresses</h4>
                <div className="space-y-1">
                  <p className="flex items-center text-gray-300">
                    <Mail className="w-5 h-5 mr-2" color="#00a67e" />
                    babbar@ai-next.co
                  </p>
                  <p className="flex items-center ml-7 text-gray-300">
                    kamran@ai-next.co
                  </p>
                  <p className="flex items-center ml-7 text-gray-300">
                    abbas@ai-next.co
                  </p>
                  <p className="flex items-center ml-7 text-gray-300">
                    raza@ai-next.co
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3 md:mb-1 md:mt-10 text-white">Office</h4>
                <div className="flex space-x-4">
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      <img 
                        src="https://flagcdn.com/w80/pk.png" 
                        alt="Pakistan" 
                        className="w-12 h-8 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      <img 
                        src="https://flagcdn.com/w80/tr.png" 
                        alt="Turkey" 
                        className="w-12 h-8 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="text-xs text-gray-400 text-center border-t border-gray-600 pt-5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AI.NEXT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;