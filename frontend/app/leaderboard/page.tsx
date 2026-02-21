"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  elo: number;
  wins: number;
  losses: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [type, setType] = useState<"global" | "weekly">("global");

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/leaderboard/${type}/`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [type]);

  return (
    <main className="min-h-screen p-10 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-700 opacity-20 blur-3xl rounded-full -z-10 animate-pulse -top-20 right-0"></div>
      <div className="absolute w-96 h-96 bg-blue-700 opacity-10 blur-3xl rounded-full -z-10 animate-pulse bottom-0 left-0" style={{ animationDelay: '1.5s' }}></div>

      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>


      <div className="mb-6">
        <button
          onClick={() => setType("global")}
          className="mr-3 px-4 py-2 bg-blue-600 rounded-lg font-semibold"
        >
          Global
        </button>
        <button
          onClick={() => setType("weekly")}
          className="px-4 py-2 bg-purple-600 rounded-lg font-semibold"
        >
          Weekly
        </button>
      </div>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="glass-card p-5 flex justify-between items-center transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="font-semibold">
              #{index + 1} {user.username}
            </span>

            <div className="text-right">
              <p className="font-bold">ELO: {user.elo}</p>
              <p className="text-sm opacity-70">
                {user.wins}W / {user.losses}L
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}