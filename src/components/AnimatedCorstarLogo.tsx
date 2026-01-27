import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOGO_PATH = '/image.png';

export default function AnimatedCorstarLogo() {
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPulse(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.4
          }}
        >
          <img
            src={LOGO_PATH}
            alt="Corstar Communications"
            className="h-[160px] sm:h-[200px] lg:h-[240px] w-auto drop-shadow-2xl relative z-10"
            style={{ transform: 'scale(0.4275)' }}
          />
        </motion.div>

        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 0.9,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'scale(0.5)' }}
        >
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 180 150 Q 250 150 300 150"
              stroke="url(#cableGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            />
            <defs>
              <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.5, 1.5, 0.8] }}
          transition={{
            delay: 1.7,
            duration: 0.6,
            ease: "easeOut"
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ transform: 'scale(0.5)' }}
        >
          <div className="w-20 h-20 rounded-full bg-blue-400 blur-2xl opacity-60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 40px rgba(59, 130, 246, 0.5)',
              '0 0 20px rgba(59, 130, 246, 0.3)'
            ]
          }}
          transition={{
            delay: 1.7,
            duration: 0.4,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ transform: 'scale(0.5)' }}
        />

        {showPulse && (
          <motion.div
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 12,
              ease: "easeInOut"
            }}
            className="absolute inset-0 pointer-events-none"
            style={{ transform: 'scale(0.5)' }}
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full blur-md opacity-60" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
