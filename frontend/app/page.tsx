"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 relative overflow-hidden px-4">
      {/* Ambient orbs */}
      <div className="orb orb-purple w-[400px] h-[400px] -top-40 -left-40" />
      <div className="orb orb-blue w-[350px] h-[350px] bottom-1/4 right-1/4" style={{ animationDelay: "-3s" }} />
      <div className="orb orb-cyan w-[280px] h-[280px] top-1/2 right-0 opacity-25" style={{ animationDelay: "-5s" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-10 text-center"
      >
        <h1 className="font-display text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-blue-500">
          SHADOWRANK
        </h1>
        <p className="text-zinc-400 text-lg max-w-md -mt-4">
          Competitive Mafia. Prove your reads. Climb the ranks.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/lobby">
            <motion.span
              className="esports-button px-10 py-4 rounded-xl font-semibold text-center block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enter Lobby
            </motion.span>
          </Link>
          <Link href="/match">
            <motion.span
              className="esports-button-ghost px-10 py-4 rounded-xl font-semibold text-center block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enter Match
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
