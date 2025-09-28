import React from "react";
import BackgroundWrapper from "./BackgroundWrapper"; // Adjust path as needed

const AIOptimizationSection = () => {
  return (
    <BackgroundWrapper>
      <section className="w-full py-0 sm:py-10" id="specifications">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">        
          {/* Main content with text mask image - responsive text sizing */}
          <div className="max-w-7xl pl-4 sm:pl-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-tight mb-8 sm:mb-12">
              <span className="block bg-clip-text text-transparent bg-[url('/text-maskk-image.png')] bg-cover bg-center">
                We help organizations leverage AI to optimize operations, enhance decision-making, and drive growth. From automation to predictive insights, our solutions are built to scale with your business.
              </span>
            </h2>
          </div>
        </div>
      </section>
    </BackgroundWrapper>
  );
};

export default AIOptimizationSection;