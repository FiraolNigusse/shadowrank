"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  elo: number;
  wins: number;
  losses: number;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/me/")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <div className="text-white">Loading...</div>;

  const winRate = user.wins + user.losses === 0
    ? 0
    : (user.wins / (user.wins + user.losses)) * 100;

  return (
    <main className="min-h-screen p-8 flex flex-col items-center relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-700 opacity-20 blur-3xl rounded-full -z-10 animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <img
        src={`https://i.pravatar.cc/150?u=${user.username}`}
        className="w-32 h-32 rounded-full mb-6 border-4 border-purple-500/30"
      />
      <h1 className="text-4xl font-bold">{user.username}</h1>
      <p className="mt-2 text-xl opacity-70">ELO: {user.elo}</p>
      <p className="text-sm px-4 py-1 bg-purple-900/40 rounded-full mt-3 border border-purple-500/20">Ranked Player</p>

      <div className="mt-8 w-80 glass-card p-6">
        <div className="flex justify-between mb-2">
          <span>Wins</span>
          <span className="font-bold text-green-400">{user.wins}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Losses</span>
          <span className="font-bold text-red-400">{user.losses}</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
          <span>Win Rate</span>
          <span className="font-bold">{winRate.toFixed(1)}%</span>
        </div>
      </div>


      <div className="mt-6 w-80 h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${winRate}%` }}
        />
      </div>
    </main>
  );
}