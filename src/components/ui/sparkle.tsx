// Sparkle.tsx
import { motion } from 'framer-motion';

const Sparkle = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.5 },
              }}
              className="absolute bg-yellow-300 rounded-full opacity-75"
              style={{
                width: `${Math.random() * 5 + 5}px`, // Random width
                height: `${Math.random() * 5 + 5}px`, // Random height
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                filter: `blur(${Math.random() * 5}px)`,
                transform: `translate(-50%, -50%)`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Sparkle;
