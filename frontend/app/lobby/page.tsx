"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Player {
  id: string;
  username: string;
  avatarUrl: string;
  rank: string;
}

export default function Lobby() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Dummy queued players (replace with real API fetch later)
  useEffect(() => {
    setPlayers([
      { id: "1", username: "Player1", avatarUrl: "https://i.pravatar.cc/150?img=1", rank: "Bronze" },
      { id: "2", username: "Player2", avatarUrl: "https://i.pravatar.cc/150?img=2", rank: "Silver" },
    ]);
  }, []);

  useEffect(() => {
    if (ready && countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [ready, countdown]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-700 opacity-20 blur-3xl rounded-full -z-10 animate-pulse top-0 left-1/2 -translate-x-1/2"></div>

      <h1 className="text-4xl font-bold mb-6">Lobby</h1>


      <div className="flex gap-6 mb-6">
        {players.map(player => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center glass-card p-4 w-28 transition-all duration-300 hover:scale-105"
          >
            <img
              src={player.avatarUrl}
              alt="avatar"
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-semibold">{player.username}</span>
            <span className="text-xs opacity-70">{player.rank}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => setReady(!ready)}
        whileTap={{ scale: 0.95 }}
        className="esports-button px-8 py-3 rounded-xl font-semibold text-white"
      >
        {ready ? "Ready" : "Click to Ready"}
      </motion.button>

      {ready && (
        <p className="mt-6 text-xl font-medium">
          Game starts in: {countdown}s
        </p>
      )}
    </main>
  );
}