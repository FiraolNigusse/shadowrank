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
    <main>
      <h2 className="text-3xl font-bold mb-2">Match History</h2>
      <p className="text-gray-400 mb-10">Your past games</p>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-16 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📋</span>
          </div>
          <p className="text-gray-400 mb-2 font-medium">No matches yet</p>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Enter a lobby, play a game, and your history will appear here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {history.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="card p-6 hover:border-white/10"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold">Match #{match.match}</h3>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${
                    match.result === "Win"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {match.result}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                <span className="text-gray-500">Role:</span> {match.role}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {match.summary}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
