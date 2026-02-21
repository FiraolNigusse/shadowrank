"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Player {
  id: string;
  username: string;
  avatarUrl: string;
  alive: boolean;
}

export default function Match() {
  const [players] = useState<Player[]>([
  { id: "1", username: "Player1", avatarUrl: "https://i.pravatar.cc/150?img=3", alive: true },
  { id: "2", username: "Player2", avatarUrl: "https://i.pravatar.cc/150?img=4", alive: true },
  ]);
  const [phase, setPhase] = useState<"day" | "night">("night");
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-4">
        {phase.toUpperCase()} PHASE
      </h1>

      <div className="flex gap-4 mb-6">
        {players.map(player => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col items-center p-2 rounded-xl w-24 ${
              player.alive ? "bg-gray-900" : "bg-gray-700 line-through"
            }`}
          >
            <img src={player.avatarUrl} alt="avatar" className="w-16 h-16 rounded-full mb-1" />
            <span className="font-semibold">{player.username}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-2">Vote Panel</h2>
        {players
          .filter(p => p.alive)
          .map(player => (
            <motion.button
              key={player.id}
              onClick={() => setSelectedVote(player.id)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 mb-1 rounded-xl font-semibold ${
                selectedVote === player.id ? "bg-red-500" : "bg-gray-800"
              }`}
            >
              {player.username}
            </motion.button>
          ))}
        {selectedVote && <p className="mt-2">You voted for: {players.find(p => p.id === selectedVote)?.username}</p>}
      </div>

      <div className="mt-6 w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-green-500" style={{ width: `${players.filter(p => p.alive).length / players.length * 100}%` }} />
      </div>
      <p className="mt-1 text-sm">Alive players</p>
    </main>
  );
}