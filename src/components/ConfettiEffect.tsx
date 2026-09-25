import React from 'react';

export const ConfettiEffect: React.FC = () => {
  const pieces = Array.from({ length: 45 });
  const colors = ['#d31027', '#ff4a58', '#ffd700', '#10b981', '#3b82f6', '#ec4899', '#ffffff'];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 1.5;
        const duration = 2.5 + Math.random() * 2;
        const color = colors[i % colors.length];
        const size = 6 + Math.random() * 8;

        return (
          <div
            key={i}
            className="absolute rounded-sm opacity-90 animate-bounce"
            style={{
              left: `${left}%`,
              top: `-20px`,
              width: `${size}px`,
              height: `${size * (i % 2 === 0 ? 1 : 1.6)}px`,
              backgroundColor: color,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `fall ${duration}s ease-in ${animationDelay}s forwards`,
              boxShadow: `0 0 10px ${color}`
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
