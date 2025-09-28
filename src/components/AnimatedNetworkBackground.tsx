import React, { useEffect, useRef } from 'react';

const AnimatedNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number>();

  // Responsive configuration based on screen size
  const getResponsiveConfig = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    
    if (isMobile) {
      return {
        particleCount: Math.floor(area / 8000), // Much fewer particles on mobile
        maxDistance: 120, // Fixed max distance for mobile
        particleRadius: 2.5,
        velocityMultiplier: 1.2,
        lineWidth: 0.5
      };
    } else if (isTablet) {
      return {
        particleCount: Math.floor(area / 6000),
        maxDistance: 120,
        particleRadius: 2.5,
        velocityMultiplier: 1.2,
        lineWidth: 0.5
      };
    } else {
      return {
        particleCount: Math.floor(area / 5000),
        maxDistance: 120,
        particleRadius: 2.5,
        velocityMultiplier: 1.2,
        lineWidth: 0.5
      };
    }
  };

  // Particle class with responsive properties
  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, config: any) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 1.5 * config.velocityMultiplier;
      this.vy = (Math.random() - 0.5) * 1.5 * config.velocityMultiplier;
      this.radius = config.particleRadius;
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff00';
      ctx.fill();
    }
  }

  // Function to set canvas size and re-initialize particles
  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear existing particles and reinitialize with new config
    particlesRef.current = [];
    initParticles();
  };

  // Initialize all particles with responsive config
  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config = getResponsiveConfig();
    
    for (let i = 0; i < config.particleCount; i++) {
      particlesRef.current.push(new Particle(canvas, config));
    }
  };

  // Connect particles with lines if they are close enough
  const connectParticles = (ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;
    const config = getResponsiveConfig();
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = Math.sqrt(
          (particles[i].x - particles[j].x) ** 2 + 
          (particles[i].y - particles[j].y) ** 2
        );
        if (distance < config.maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Make lines fade out with distance
          const opacity = 1 - distance / config.maxDistance;
          ctx.strokeStyle = `rgba(0, 255, 0, ${opacity * 0.6})`; // Slightly more transparent
          ctx.lineWidth = config.lineWidth;
          ctx.stroke();
        }
      }
    }
  };

  // The main animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear the canvas with background color
    ctx.fillStyle = '#1a3636';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach(p => { 
      p.move(); 
      p.draw(ctx); 
    });
    
    connectParticles(ctx);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle window resize with debouncing
  const handleResize = (() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setCanvasSize();
      }, 150); // Debounce resize events
    };
  })();

  useEffect(() => {
    // Initial setup
    setCanvasSize();
    animate();

    // Event listener to resize the canvas when the window size changes
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="network-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default AnimatedNetworkBackground;