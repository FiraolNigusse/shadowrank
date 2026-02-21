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
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <img
        src={`https://i.pravatar.cc/150?u=${user.username}`}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h1 className="text-3xl font-bold">{user.username}</h1>
      <p className="mt-2 text-xl">ELO: {user.elo}</p>

      <div className="mt-6 w-80 bg-gray-800 p-4 rounded-xl">
        <p>Wins: {user.wins}</p>
        <p>Losses: {user.losses}</p>
        <p>Win Rate: {winRate.toFixed(1)}%</p>
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