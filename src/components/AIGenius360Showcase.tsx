import React from "react";
import BackgroundWrapper from "./BackgroundWrapper"; // Adjust path as needed

const AIGenius360Showcase = () => {
  return (
    <BackgroundWrapper>
      <section className="w-full pt-0 pb-12 -mt-20" id="showcase">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-3 sm:mb-4">
              AI Solutions in Action
            </h2>
            <p className="text-base sm:text-xl text-gray-200">
              See how AI Next transforms business operations across industries with intelligent automation and predictive insights.
            </p>
          </div>
          
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
            <div className="w-full">
              <img 
                src="/uploads/genius-360.png" 
                alt="Genius360: Banking AI Revolution" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-white p-4 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4">Genius360: Banking AI Revolution</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Powered by advanced machine learning and data analytics, our AI solutions seamlessly integrate into your business ecosystem, from financial services to healthcare, driving efficiency and unlocking new growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BackgroundWrapper>
  );
};

export default AIGenius360Showcase;