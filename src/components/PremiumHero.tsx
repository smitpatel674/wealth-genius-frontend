import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const PremiumHero: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const isMobile = window.innerWidth < 600;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 15;
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: !isMobile 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting with colored lights for atmosphere
    const ambientLight = new THREE.AmbientLight(0x4488ff, 0.3);
    scene.add(ambientLight);
    
    const light1 = new THREE.DirectionalLight(0x00ffff, 0.8);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0xff00ff, 0.5);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Create enhanced candlestick with glow
    function createCandlestick(color: number, height: number) {
      const group = new THREE.Group();
      
      // Body with emissive glow
      const bodyGeometry = new THREE.BoxGeometry(0.4, height, 0.4);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        shininess: 100
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = height / 2;
      group.add(body);
      
      // Upper wick
      const wickGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
      const wickMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.2
      });
      const upperWick = new THREE.Mesh(wickGeometry, wickMaterial);
      upperWick.position.y = height + 0.25;
      group.add(upperWick);
      
      // Lower wick
      const lowerWick = new THREE.Mesh(wickGeometry, wickMaterial);
      lowerWick.position.y = -0.25;
      group.add(lowerWick);
      
      return group;
    }

    // Top cluster (above text) - more spread out
    const topCluster = new THREE.Group();
    const topCandleCount = isMobile ? 5 : 8;
    for (let i = 0; i < topCandleCount; i++) {
      const isGreen = i % 2 === 0;
      const color = isGreen ? 0x10b981 : 0xef4444;
      const height = 1 + Math.random() * 1.2;
      const candle = createCandlestick(color, height);
      
      const angle = (i / topCandleCount) * Math.PI * 2;
      const radius = isMobile ? 4 : 6;
      candle.position.x = Math.cos(angle) * radius;
      candle.position.y = isMobile ? 5 : 6;
      candle.position.z = Math.sin(angle) * radius - 6;
      
      candle.userData = { baseY: candle.position.y, phase: Math.random() * Math.PI * 2 };
      topCluster.add(candle);
    }
    scene.add(topCluster);

    // Bottom cluster (below text) - more dramatic
    const bottomCluster = new THREE.Group();
    const bottomCandleCount = isMobile ? 6 : 10;
    for (let i = 0; i < bottomCandleCount; i++) {
      const isGreen = i % 2 === 1;
      const color = isGreen ? 0x10b981 : 0xef4444;
      const height = 0.8 + Math.random() * 1.5;
      const candle = createCandlestick(color, height);
      
      const angle = (i / bottomCandleCount) * Math.PI * 2;
      const radius = isMobile ? 4.5 : 7;
      candle.position.x = Math.cos(angle) * radius;
      candle.position.y = isMobile ? -5 : -6;
      candle.position.z = Math.sin(angle) * radius - 10;
      
      candle.userData = { baseY: candle.position.y, phase: Math.random() * Math.PI * 2 };
      bottomCluster.add(candle);
    }
    scene.add(bottomCluster);

    // Enhanced floating particles with colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = isMobile ? 150 : 300;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 30 - 10;
      
      // Random colors (cyan, blue, purple)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i3] = 0; colors[i3 + 1] = 1; colors[i3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.3; colors[i3 + 1] = 0.5; colors[i3 + 2] = 1; // Blue
      } else {
        colors[i3] = 0.8; colors[i3 + 1] = 0.3; colors[i3 + 2] = 1; // Purple
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.06,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    const clock = new THREE.Clock();
    
    function animate() {
      const time = clock.getElapsedTime();
      
      // Rotate clusters with mouse influence
      topCluster.rotation.y = time * 0.15 + mousePosition.x * 0.3;
      bottomCluster.rotation.y = -time * 0.2 + mousePosition.x * 0.3;
      
      // Individual candle bobbing
      topCluster.children.forEach((candle: any) => {
        candle.position.y = candle.userData.baseY + Math.sin(time * 0.8 + candle.userData.phase) * 0.3;
        candle.rotation.z = Math.sin(time * 0.5 + candle.userData.phase) * 0.1;
      });
      
      bottomCluster.children.forEach((candle: any) => {
        candle.position.y = candle.userData.baseY + Math.cos(time * 0.7 + candle.userData.phase) * 0.4;
        candle.rotation.z = Math.cos(time * 0.6 + candle.userData.phase) * 0.1;
      });
      
      // Particles drift and twinkle
      particles.rotation.y = time * 0.03;
      particles.rotation.x = time * 0.01;
      
      const particlePositions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlePositions.length; i += 3) {
        particlePositions[i + 1] += Math.sin(time + i) * 0.002;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Camera subtle movement with mouse
      camera.position.x = mousePosition.x * 0.5;
      camera.position.y = mousePosition.y * 0.3;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    }
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [mousePosition]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#030712] via-[#0a0f1f] to-[#030712]">
      {/* 3D Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Content Overlay with entrance animation */}
      <div className={`relative z-10 flex flex-col items-center h-full px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center max-w-5xl mx-auto space-y-3 sm:space-y-6 md:space-y-8 mt-16 sm:mt-0 sm:absolute sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
          {/* Main Title with enhanced animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(59,130,246,0.6)] animate-pulse leading-tight">
            Wealth Genius
          </h1>
          
          {/* Subtitle with slide-in animation */}
          <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 drop-shadow-lg transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            Master Stock Market Trading in India
          </p>
          
          {/* Meta Line with fade-in */}
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 tracking-wider max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Learn from Expert Traders | Live Market Sessions | Real Trading Strategies
          </p>
          
          {/* CTA Buttons with staggered animation */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 md:pt-10 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => navigate('/courses')}
              className="group relative w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 text-white font-bold text-base sm:text-lg md:text-xl shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.8)] hover:scale-110 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Start Learning</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={() => navigate('/courses')}
              className="group w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-white/5 backdrop-blur-md border-2 border-white/40 text-white font-bold text-base sm:text-lg md:text-xl hover:bg-white/15 hover:border-white/60 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-110 transition-all duration-300"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300">
                Watch Demo
              </span>
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-gray-400 text-sm">Scroll to explore</span>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
    </div>
  );
};

export default PremiumHero;
