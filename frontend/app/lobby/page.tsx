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
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Lobby</h1>
      <div className="flex gap-4 mb-4">
        {players.map(player => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center bg-gray-900 p-2 rounded-xl shadow-lg w-24"
          >
            <img src={player.avatarUrl} alt="avatar" className="w-16 h-16 rounded-full mb-1" />
            <span className="font-semibold">{player.username}</span>
            <span className="text-xs">{player.rank}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => setReady(!ready)}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-2 rounded-xl font-bold ${
          ready ? "bg-green-500" : "bg-blue-500"
        }`}
      >
        {ready ? "Ready" : "Click to Ready"}
      </motion.button>

      {ready && <p className="mt-4 text-xl">Game starts in: {countdown}s</p>}
    </main>
  );
}