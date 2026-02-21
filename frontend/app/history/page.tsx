"use client";

import { useEffect, useState } from "react";

interface MatchHistory {
  match: number;
  role: string;
  result: string;
  summary: string;
}

export default function History() {
  const [history, setHistory] = useState<MatchHistory[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/history/", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Match History</h1>

      {history.length === 0 && (
        <p>No matches played yet.</p>
      )}

      <div className="space-y-4">
        {history.map((match, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold">
              Match #{match.match}
            </h2>

            <p>Role: {match.role}</p>
            <p className={match.result === "Win" ? "text-green-400" : "text-red-400"}>
              Result: {match.result}
            </p>

            <div className="mt-2 text-sm text-gray-300">
              {match.summary}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}