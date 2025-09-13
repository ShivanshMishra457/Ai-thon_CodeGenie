import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDelay: number;
}

export const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['var(--primary)', 'var(--accent)', 'var(--primary-glow)'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: Math.random() * 8,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Orbs */}
      <div className="floating-orb bg-primary/20 w-96 h-96 -top-48 -left-48" style={{ animationDelay: '0s' }} />
      <div className="floating-orb bg-accent/20 w-72 h-72 top-1/3 -right-36" style={{ animationDelay: '2s' }} />
      <div className="floating-orb bg-primary-glow/20 w-80 h-80 bottom-0 left-1/3" style={{ animationDelay: '4s' }} />
      
      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `hsl(${particle.color})`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{
             backgroundImage: `
               linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }} 
      />
    </div>
  );
};