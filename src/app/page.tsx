"use client";

import { useEffect, useMemo, useState } from "react";

type User = { id: string; name: string; occupation?: string; email?: string };

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setUsers(await res.json());
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) => u.name.toLowerCase().includes(term));
  }, [q, users]);

  return (
    <main className="mx-auto max-w-3xl p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
        <p className="text-sm text-gray-500">List, search, and view details</p>
      </header>

      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search users by name…"
          className="w-full rounded-md border border-gray-300 p-2 outline-none ring-0 focus:border-gray-400"
        />
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {filtered.map((u) => (
          <li
            key={u.id}
            className="rounded-lg border border-gray-200 p-4 transition hover:shadow-sm"
          >
            <div className="mb-1 font-medium">{u.name}</div>
            <div className="text-sm text-gray-600">{u.occupation || "—"}</div>
            <a
              href={`/user/${u.id}`}
              className="mt-3 inline-block text-sm text-blue-600 underline"
            >
              View details →
            </a>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-sm text-gray-500">No users found.</li>
        )}
      </ul>
    </main>
  );
}
