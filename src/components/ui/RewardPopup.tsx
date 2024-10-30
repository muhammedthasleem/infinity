'use client';

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Import DialogTitle

interface RewardPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  xpAmount?: number;
  currencyAmount?: number;
}

export default function RewardPopup({
  isOpen = true,
  onClose = () => {},
  xpAmount = 20,
  currencyAmount = 250000000
}: RewardPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] border-0 bg-[#1a1614]/95 p-0 text-white">
        <motion.div
          className="relative overflow-hidden rounded-lg px-6 py-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Background rays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(255,215,0,0.15),transparent_50%)]" />

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Content */}
          <div className="relative space-y-6 text-center">
            <DialogTitle className="text-4xl font-bold text-yellow-400 mb-2">Congratulations!</DialogTitle>
            <motion.h3
              className="text-xl text-yellow-400/90"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Command completed Successfully!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 max-w-md mx-auto"
            >
              You have successfully completed a command! Here are your well-earned rewards. Keep exploring the Command Center for even more exciting missions and bigger rewards!
            </motion.p>

            <div className="space-y-4">
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-yellow-400/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#1a1614] px-2 text-yellow-400/70">Rewards</span>
                </div>
              </div>

              <motion.div 
                className="flex justify-center gap-4 pt-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {/* XP Reward Card */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                  <div className="relative flex flex-col items-center gap-2 px-6 py-4 bg-black rounded-lg leading-none">
                    <div className="text-yellow-400 text-2xl font-bold">XP</div>
                    <div className="text-yellow-300">{xpAmount}</div>
                  </div>
                </motion.div>

                {/* Currency Reward Card */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                  <div className="relative flex flex-col items-center gap-2 px-6 py-4 bg-black rounded-lg leading-none">
                    <div className="text-cyan-400 text-2xl font-bold">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="text-cyan-300">{currencyAmount.toLocaleString()}</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
