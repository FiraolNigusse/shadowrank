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
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <main className="min-h-screen p-8 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-700 opacity-20 blur-3xl rounded-full -z-10 animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-700 opacity-10 blur-3xl rounded-full -z-10 animate-pulse bottom-0 right-0" style={{ animationDelay: '3s' }}></div>

      <h1 className="text-3xl font-bold mb-6">Match History</h1>


      {history.length === 0 && (
        <p>No matches played yet.</p>
      )}

      <div className="space-y-6">
        {history.map((match, index) => (
          <div
            key={index}
            className="glass-card p-6 transition-all duration-300 hover:scale-[1.02]"
          >
            <h2 className="text-xl font-semibold mb-2">
              Match #{match.match}
            </h2>

            <p>Role: {match.role}</p>

            <p
              className={
                match.result === "Win"
                  ? "text-green-400 font-semibold"
                  : "text-red-400 font-semibold"
              }
            >
              Result: {match.result}
            </p>

            <div className="mt-3 text-sm opacity-80">
              {match.summary}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}