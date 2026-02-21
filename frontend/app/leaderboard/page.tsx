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
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>

      <div className="mb-4">
        <button
          onClick={() => setType("global")}
          className="mr-2 px-4 py-2 bg-blue-600 rounded"
        >
          Global
        </button>
        <button
          onClick={() => setType("weekly")}
          className="px-4 py-2 bg-purple-600 rounded"
        >
          Weekly
        </button>
      </div>

      <div className="space-y-2">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex justify-between bg-gray-800 p-3 rounded-xl"
          >
            <span>#{index + 1} {user.username}</span>
            <span>ELO: {user.elo}</span>
          </div>
        ))}
      </div>
    </main>
  );
}