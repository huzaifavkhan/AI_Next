import React, { useEffect, useRef } from "react";
import { 
  Lightbulb, 
  MessageSquare, 
  BookOpen, 
  Layers, 
  Shield, 
  Users 
} from "lucide-react";
import BackgroundWrapper from "./BackgroundWrapper"; // Adjust path as needed

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="feature-card p-4 sm:p-6 backdrop-blur-md shadow-2xl border border-white/50 transition-all duration-300"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[#00a67e] mb-4 sm:mb-5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{title}</h3>
      <p className="text-gray-200 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <BackgroundWrapper>
      <section className="sm:py-16 md:py-0 pb-0 relative" id="features" ref={sectionRef}>
        <div className="section-container">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-title mb-1 sm:mb-4 opacity-0 fade-in-element text-white">
              Next-Generation AI, <br className="hidden sm:block" />Limitless Possibilities
            </h2>
            <p className="section-subtitle mx-auto opacity-0 fade-in-element text-gray-300">
              Powered by advanced machine learning and neural networks to deliver intelligent solutions for tomorrow's challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 -mt-4 sm:gap-6 md:gap-8">
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="Deep Learning"
              description="Advanced neural networks that continuously learn and evolve, providing increasingly intelligent responses and predictions."
              index={0}
            />
            <FeatureCard
              icon={<MessageSquare className="w-7 h-7 sm:w-10 sm:h-10" />}
              title="Natural Language Processing"
              description="Understand and generate human-like text with context awareness, emotion recognition, and multilingual support."
              index={1}
            />
            <FeatureCard
              icon={<BookOpen className="w-7 h-7 sm:w-10 sm:h-10" />}
              title="Knowledge Synthesis"
              description="Process vast amounts of information instantly, connecting insights across domains to provide comprehensive understanding."
              index={2}
            />
            <FeatureCard
              icon={<Layers className="w-7 h-7 sm:w-10 sm:h-10" />}
              title="Multi-Modal AI"
              description="Seamlessly process text, images, audio, and data to provide rich, contextual insights across multiple formats."
              index={3}
            />
            <FeatureCard
              icon={<Shield className="w-7 h-7 sm:w-10 sm:h-10" />}
              title="Ethical AI Framework"
              description="Built with responsible AI principles, ensuring fairness, transparency, and privacy protection in all interactions."
              index={4}
            />
            <FeatureCard
              icon={<Users className="w-7 h-7 sm:w-10 sm:h-10" />}
              title="Personalized Intelligence"
              description="Adapt to individual preferences, learning styles, and workflows to deliver truly personalized AI experiences."
              index={5}
            />
          </div>
        </div>
      </section>
    </BackgroundWrapper>
  );
};

export default Features;