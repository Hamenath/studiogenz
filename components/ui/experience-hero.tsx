"use client";

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            gl_FragColor = vec4(mix(vec3(0.98), vec3(0.92), color), 1.0);
          }
        `}
      />
    </mesh>
  );
};


export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(revealRef.current, 
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );
      
      gsap.from(".command-cell", {
        x: 60, opacity: 0, stagger: 0.1, duration: 1.5, ease: "power4.out", delay: 1, clearProps: "all"
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
        if (dist < 150) {
          gsap.to(ctaRef.current, { x: (e.clientX - (rect.left + rect.width/2)) * 0.4, y: (e.clientY - (rect.top + rect.height/2)) * 0.4, duration: 0.6 });
        } else {
          gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-transparent flex flex-col selection:bg-black selection:text-white overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={0.8} />
          <spotLight position={[50, 50, 50]} intensity={2} />
          <LiquidBackground />
        </Canvas>
      </div>

      <div ref={revealRef} className="relative z-10 w-full flex flex-col md:flex-row px-8 pb-8 pt-32 md:px-14 md:pb-14 md:pt-40 lg:px-20 lg:pb-20 lg:pt-48 min-h-screen items-center md:items-stretch gap-10">
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-12 md:pb-8 w-full">
          <div className="flex items-center gap-3">
             <div className="relative w-2.5 h-2.5 bg-black rounded-full">
                <div className="absolute inset-0 bg-black rounded-full animate-ping opacity-30" />
             </div>
             <span className="font-mono text-[11px] font-bold text-black tracking-[0.2em] uppercase">STUDIO GENZ</span>
          </div>

          <div className="max-w-4xl lg:-translate-y-5 pr-12">
            <h1 className="text-[clamp(3.5rem,9.5vw,11.5rem)] font-black leading-[0.87] tracking-tighter text-black uppercase italic-none">
              CREATIVE <br /> <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(0,0,0,0.15)" }}>AGENCY</span>
            </h1>
            <p className="mt-8 font-mono text-[11px] text-black/60 uppercase tracking-[0.35em] max-w-sm leading-relaxed">
              We engineer immersive digital experiences through spatial logic and advanced WebGL.
            </p>
          </div>
          
          <button ref={ctaRef} className="w-fit flex items-center gap-6 group lg:-translate-y-20">
             <div className="w-14 h-14 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black transition-all duration-500 overflow-hidden">
                <ArrowUpRight className="w-[18px] h-[18px] stroke-black group-hover:stroke-white transition-colors duration-500" strokeWidth={2.5} />
             </div>
             <span className="font-mono text-[11px] font-bold text-black uppercase tracking-[0.2em]">Start a Project</span>
          </button>
        </div>

        <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col gap-4 justify-center z-20">
          {[
            { id: "001", title: "AVAILABILITY", val: "Open", type: "progress" },
            { id: "002", title: "STUDIO STATS", val: "20+ Wins", type: "data" },
            { id: "003", title: "EXPERTISE", val: "Creative Dev", type: "text" }
          ].map((item) => (
            <div key={item.id} className="command-cell glass p-6 sm:p-7 block opacity-1">
              <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest block mb-3">{item.id} // {item.title}</span>
              {item.type === "progress" ? (
                <div className="flex justify-between items-end mt-2">
                  <h4 className="text-2xl sm:text-3xl font-bold text-black tracking-tighter">{item.val}</h4>
                  <div className="h-[2px] w-20 bg-black/10 rounded-full overflow-hidden">
                     <div className="h-full bg-black w-[60%] animate-[loading-slide_2s_infinite]" />
                  </div>
                </div>
              ) : item.type === "data" ? (
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-mono text-black/60">
                    <span>Awwwards Tier</span>
                    <span>2024-25</span>
                  </div>
                  <div className="h-px w-full bg-black/10" />
                  <div className="flex justify-between text-[10px] font-mono text-black/60">
                    <span>Retention Rate</span>
                    <span>98.2%</span>
                  </div>
                </div>
              ) : (
                <h3 className="text-sm font-medium text-black/80 mt-3 leading-snug">
                  Transforming static interfaces into <span className="italic font-bold">narrative apertures</span>.
                </h3>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
