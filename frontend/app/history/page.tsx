"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MatchHistory {
  match: number;
  role: string;
  result: string;
  summary: string;
}

export default function History() {
  const [history, setHistory] = useState<MatchHistory[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/history/", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => setHistory([]));
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-10 relative overflow-hidden">
      <div className="orb orb-purple w-80 h-80 -top-20 -left-20" />
      <div className="orb orb-blue w-64 h-64 bottom-0 right-0 opacity-30" style={{ animationDelay: "-3s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2 text-zinc-100">
          MATCH HISTORY
        </h1>
        <p className="text-zinc-500 text-sm mb-10">Your past games</p>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
              <span className="text-3xl opacity-50">📋</span>
            </div>
            <p className="text-zinc-400 mb-2">No matches played yet</p>
            <p className="text-sm text-zinc-500">
              Enter a lobby and start your climb.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ x: 4 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-display text-xl text-zinc-200">
                    Match #{match.match}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      match.result === "Win"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {match.result}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 mb-2">Role: {match.role}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {match.summary}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
}
