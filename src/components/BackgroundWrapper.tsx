// src/components/BackgroundWrapper.tsx
import React from 'react';
import AnimatedNetworkBackground from './AnimatedNetworkBackground';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`relative min-h-screen ${className}`}
      style={style}
    >
      {/* Animated Network Background - Same on every page */}
      <AnimatedNetworkBackground />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;