"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-6"
          >
            Competitive Mafia
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            SHADOW<span className="text-purple-500">RANK</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Prove your reads. Outsmart the town. Climb the ranks.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/lobby">
            <motion.span
              className="primary-btn inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enter Lobby
              <span className="text-purple-200">→</span>
            </motion.span>
          </Link>
          <Link href="/match">
            <motion.span
              className="secondary-btn inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Quick Match
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-8 justify-center text-sm text-gray-500 pt-8"
        >
          <span>🏆 Ranked</span>
          <span>⚡ Fast games</span>
          <span>🎭 Social deduction</span>
        </motion.div>
      </motion.div>
    </main>
  );
}
