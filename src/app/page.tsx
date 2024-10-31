'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"
import Sparkle from '@/components/ui/sparkle'
import RewardPopup from '@/components/ui/RewardPopup'
import { div } from 'framer-motion/client'

const isOpen = true
const currentXP = 50000
const maxXP = 50000
const newLevel = "Corporal"
const badgeImage = "https://cdn.builder.io/api/v1/image/assets%2F660a51774ca344f0a216e9349fc895fc%2F215170094f6a480f8ef2e16ca28b33fb"

function LevelUpPopup() {
  const [progress, setProgress] = useState(0)
  const [displayXP, setDisplayXP] = useState(0)
  
  const [showSparkles, setShowSparkles] = useState(false)
  const [showRewardPopup, setShowRewardPopup] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const targetProgress = (currentXP / maxXP) * 100
      const progressTimer = setTimeout(() => {
        setProgress(targetProgress)
      }, 500)

      const scoreTimer = setInterval(() => {
        setDisplayXP((prevXP) => {
          const increment = Math.ceil((currentXP - prevXP) / 15)
          return prevXP + increment >= currentXP ? currentXP : prevXP + increment
        })
      }, 10)

      return () => {
        clearTimeout(progressTimer)
        clearInterval(scoreTimer)
      }
    }
  }, [isOpen, currentXP, maxXP])

  // Separate useEffect to trigger sparkles independently
  useEffect(() => {
    if (progress === 100) {
      setShowSparkles(true)
      const sparkleTimer = setInterval(() => {
        setShowSparkles(false)
        setTimeout(() => setShowSparkles(true), 300) // Restart sparkles every 300ms
      }, 1000)

      return () => clearInterval(sparkleTimer)
    }
  }, [progress])

  return (
    
    <AnimatePresence >
      {isOpen && (
        <>
          <Sparkle isVisible={showSparkles} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" inset-0 z-50 p-10  flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)]" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl px-4 py-8 text-center bg-[radial-gradient(circle_at_50%_100%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)] bg-opacity-50 rounded-lg shadow-xl"
            >
              <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8">
                <h2 className="relative text-6xl font-black  text-yellow-300 tracking-wider">
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -left-8 top-0 animate-pulse"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-200" />
                  </motion.span>
                  LEVEL UP
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -right-8 top-0 animate-pulse"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-200" />
                  </motion.span>
                </h2>
              </motion.div>

                            <motion.div
                initial={{ scale: 4, opacity: 0 }} // Starts at larger scale and fades in
                animate={{ scale: 1, opacity: 1 }} // Animates to original scale and full opacity
                transition={{ type: "spring", delay: 0.3, duration: 1 }}
                className="mb-8 relative"
              >
                <div className="relative w-32 h-32 mx-auto">
                  {/* Main Badge Image */}
                  <img
                    src={badgeImage}
                    alt="Level Badge"
                    className="w-full h-full object-contain rounded-full shadow-lg z-10"
                  />
                  
                  {/* Burning Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500 via-transparent to-transparent animate-pulse rounded-full z-0 opacity-80 blur-xl" />

                  {/* Pulsating Rings for Burn Effect */}
                  <div className="absolute inset-0 rounded-full bg-yellow-500/20 opacity-60 blur-lg animate-pulse z-0" />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-60 animate-ping z-0" />
                  <div className="absolute inset-0 rounded-full border-4 border-orange-500 opacity-40 animate-ping z-0" />

                  {/* Additional spark-like circles for burning effect */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="absolute w-10 h-10 bg-yellow-500 rounded-full opacity-50 blur-md animate-pulse z-0" style={{ top: '10%', left: '10%' }} />
                    <div className="absolute w-8 h-8 bg-orange-400 rounded-full opacity-40 blur-lg animate-pulse z-0" style={{ top: '80%', right: '10%' }} />
                    <div className="absolute w-12 h-12 bg-yellow-600 rounded-full opacity-40 blur-xl animate-pulse z-0" style={{ bottom: '10%', left: '80%' }} />
                  </div>
                </div>
              </motion.div>


              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-bold text-stone-600 mb-8"
              >
                {newLevel}
              </motion.h3>

              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between  text-sm mb-2">
                  <motion.span className='text-yellow-500'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    XP: {displayXP.toLocaleString()}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {maxXP.toLocaleString()}
                  </motion.span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <Progress value={progress} className="h-4 bg-yellow-600" />
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg"
                  onClick={() => setShowRewardPopup(true)}
                >
                  Claim NFT Badge
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-xl text-neutral-200">
                    {"You've leveled up and earned a new badge!"}
                  </p>
                  <p className="text-sm text-neutral-300">
                    Claim your <span className="text-orange-300">NFT badge</span> now, or retrieve it later from your Inventory.
                  </p>
                </div>

                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  To claim your new badge, you&apos;ll need to transfer your previous badge from your wallet for it to be burned in exchange for the new one.
                  If there&apos;s insufficient gas in your wallet, the transaction will be canceled. You can always visit your Inventory and claim your badge at any time.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
      <RewardPopup
        isOpen={showRewardPopup}
        onClose={() => setShowRewardPopup(false)}
        xpAmount={20}
        currencyAmount={250000000}
      />
    </AnimatePresence>
  )
}

export default LevelUpPopup
