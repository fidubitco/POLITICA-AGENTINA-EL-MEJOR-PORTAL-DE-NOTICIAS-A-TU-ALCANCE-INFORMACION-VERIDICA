'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className = '' }: HeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationRef = useRef<number>();
  const particlesRef = useRef<THREE.Points>();
  const geometryRef = useRef<THREE.PlaneGeometry>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create animated background geometry
    const geometry = new THREE.PlaneGeometry(20, 20, 64, 64);
    geometryRef.current = geometry;

    // Create shader material for animated background
    const vertexShader = `
      uniform float uTime;
      uniform float uWaveStrength;

      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normal;

        vec3 pos = position;
        pos.z += sin(pos.x * 0.5 + uTime) * uWaveStrength;
        pos.z += cos(pos.y * 0.3 + uTime * 0.7) * uWaveStrength;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;

      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        float strength = sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime);
        vec3 color = mix(uColor1, uColor2, strength * 0.5 + 0.5);
        gl_FragColor = vec4(color, 0.1);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uWaveStrength: { value: 0.5 },
        uColor1: { value: new THREE.Color(0x1a1a2e) },
        uColor2: { value: new THREE.Color(0x16213e) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI * 0.3;
    plane.position.z = -2;
    scene.add(plane);

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Positions
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Colors (blue to purple gradient)
      colors[i3] = 0.2 + Math.random() * 0.3;     // R
      colors[i3 + 1] = 0.4 + Math.random() * 0.4; // G
      colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B

      // Scales
      scales[i] = Math.random() * 2 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Mouse interaction
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update shader uniforms
      if (material.uniforms) {
        material.uniforms.uTime.value = time;
      }

      // Animate particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Mouse interaction
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Rotate particles slowly
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // GSAP animations
    gsap.fromTo(
      plane.position,
      { z: -5 },
      {
        z: -2,
        duration: 3,
        ease: 'power2.out',
        delay: 0.5,
      }
    );

    gsap.fromTo(
      particles.material,
      { opacity: 0 },
      {
        opacity: 0.8,
        duration: 2,
        ease: 'power2.out',
        delay: 1,
      }
    );

    // Scroll animations
    ScrollTrigger.create({
      trigger: mountRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        if (material.uniforms) {
          material.uniforms.uWaveStrength.value = 0.5 + progress * 0.5;
        }
        plane.position.z = -2 + progress * 2;
      },
    });

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
      window.removeEventListener('mousemove', handleMouseMove);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}

