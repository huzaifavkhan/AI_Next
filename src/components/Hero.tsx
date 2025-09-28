import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import BackgroundWrapper from "./BackgroundWrapper";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error("Error loading Lottie animation:", error));
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <BackgroundWrapper 
      className="overflow-hidden"
      style={{
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      <section className="relative" id="hero">
        {/* Updated: Emerald gradient overlay instead of pulse */}
        <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 blur-3xl rounded-full"></div>
        
        <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2">
              
              
              <h1 
                className="section-title text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in" 
                style={{ animationDelay: "0.3s" }}
              >
                AI Next: Enabling Businesses<br className="hidden sm:inline" />Through Power of AI
              </h1>
              
              <p 
                style={{ animationDelay: "0.5s" }} 
                className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-300 font-normal text-base sm:text-lg text-left"
              >
                Bridging the Gap Between Business Challenges and Technology Solutions
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                <a 
                  href="/services" 
                  className="flex items-center justify-center group w-full sm:w-auto text-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-emerald hover:shadow-emerald-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
              {lottieData ? (
                <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                  {/* Enhanced Lottie container with emerald glow */}
                  <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 shadow-emerald-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 rounded-3xl blur-xl"></div>
                    <LottieAnimation 
                      animationPath={lottieData} 
                      className="relative z-10 w-full h-auto max-w-lg mx-auto"
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                </div>
              ) : (
                <>
                {/* Updated: Emerald-themed image container */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl sm:rounded-3xl -z-10 shadow-emerald-lg"></div>
                <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-emerald-lg hover:shadow-glow">
                  <img 
                    ref={imageRef} 
                    src="/uploads/hero-image.png" 
                    alt="Hero Image" 
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out" 
                    style={{ transformStyle: 'preserve-3d' }} 
                  />
                  {/* Updated overlay with emerald tint */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent mix-blend-overlay"></div>
                  
                  {/* Emerald border glow effect */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-emerald-400/30 shadow-inner"></div>
                </div>
                </>
              )}


            </div>
          </div>
        </div>
        

      </section>
    </BackgroundWrapper>
  );
};

export default Hero;